// Security utility for Contact Form: Profanity Filter, Spam & Bot Protection, Rate Limiting

// ==========================================
// 1. PROFANITY / BAD WORDS LIST & DETECTION
// ==========================================

// Indonesian Profanities & Abusive Words (normalized lowercase)
const INDONESIAN_PROFANITIES: string[] = [
  "anjing", "anjg", "anjir", "anjrit", "anying", "anj",
  "babi", "bangsat", "bgst", "bajingan", "bego", "bege", "bahlul",
  "kontol", "kntl", "memek", "mmk", "ngentot", "ngentd", "ngewe", "ngentoot",
  "pantek", "peler", "tai", "taek", "tahi", "goblok", "gblk", "tolol",
  "itil", "jembut", "jancuk", "jancok", "dancok", "ancuk", "jancuuk",
  "asu", "kampret", "kimak", "puki", "pepek", "perek", "lonte", "tetek",
  "biadab", "sialan", "setan", "iblis", "mampus", "bodoh", "idiot",
  "bencong", "banci", "homo", "lesbi", "kafir", "pelacur", "jablay",
  "pantat", "bokong", "sepong", "coli", "colmek"
];

// English Profanities & Abusive Words (normalized lowercase)
const ENGLISH_PROFANITIES: string[] = [
  "fuck", "fucking", "fucker", "fucked", "fuckoff", "fck", "f*ck",
  "shit", "shitty", "bullshit", "bitch", "bitches", "bitching",
  "asshole", "assholes", "bastard", "bastards", "cunt", "cunts",
  "dick", "dicks", "dickhead", "pussy", "pussies", "cock", "cocks",
  "cockhead", "slut", "sluts", "whore", "whores", "nigger", "nigga",
  "faggot", "fag", "dumbass", "motherfucker", "retard", "moron",
  "wanker", "twat", "blowjob", "handjob", "dipshit", "prick"
];

// Combine unique profane terms
const ALL_PROFANITIES = Array.from(
  new Set([...INDONESIAN_PROFANITIES, ...ENGLISH_PROFANITIES])
);

// Words that might trigger false positives if partially matched
const SAFE_EXCEPTIONS = [
  "consultant", "consulting", "assume", "assumption", "class", "classic",
  "pass", "passport", "password", "document", "documentation",
  "assistant", "assistance", "glass", "brass", "grass",
  "pantai", "secukupnya", "menanyakan", "perusahaan", "surat",
  "masuk", "asuh", "asuhan", "termasuk", "babi hutan", "pusat",
  "kemarin", "kontak", "contact", "analisis", "analyst", "analytics"
];

/**
 * Normalizes text to defeat leetspeak, spacing, and repetitive letter bypasses.
 */
function normalizeLeetspeak(input: string): string {
  let text = input.toLowerCase();

  // Replace common leetspeak substitutions
  const leetMap: Record<string, string> = {
    "@": "a",
    "4": "a",
    "3": "e",
    "1": "i",
    "!": "i",
    "|": "i",
    "0": "o",
    "5": "s",
    "$": "s",
    "7": "t",
    "+": "t",
    "8": "b",
    "9": "g",
  };

  for (const [leet, char] of Object.entries(leetMap)) {
    text = text.replaceAll(leet, char);
  }

  return text;
}

/**
 * Checks if a given text contains profane or abusive words (ID & EN).
 */
export function containsProfanity(rawText: string): {
  hasProfanity: boolean;
  matchedWord?: string;
} {
  if (!rawText || !rawText.trim()) {
    return { hasProfanity: false };
  }

  const rawLower = rawText.toLowerCase();

  // Normalize leet text
  const normalized = normalizeLeetspeak(rawLower);

  // 1. Check exact words in tokenized words
  // Remove punctuation except spaces, then split by whitespace
  const cleanTokens = normalized
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  for (const token of cleanTokens) {
    // Check if token matches profanity
    if (ALL_PROFANITIES.includes(token)) {
      return { hasProfanity: true, matchedWord: token };
    }

    // Check with duplicate characters removed (e.g. "fuuuck" -> "fuck", "annjiiing" -> "anjing")
    const collapsedToken = token.replace(/(.)\1+/g, "$1");
    if (ALL_PROFANITIES.includes(collapsedToken)) {
      return { hasProfanity: true, matchedWord: token };
    }
  }

  // 2. Check for spaced-out profanities (e.g. "k o n t o l", "f u c k")
  const compactText = normalized.replace(/\s+/g, "");
  for (const badWord of ALL_PROFANITIES) {
    // Only test words longer than 3 characters on compact text to avoid false positives
    if (badWord.length >= 4) {
      if (compactText.includes(badWord)) {
        // Check if it was an innocent word from SAFE_EXCEPTIONS
        const isSafe = SAFE_EXCEPTIONS.some((safeWord) => {
          const compactSafe = safeWord.replace(/\s+/g, "");
          return compactSafe.includes(badWord) && compactText.includes(compactSafe);
        });

        if (!isSafe) {
          return { hasProfanity: true, matchedWord: badWord };
        }
      }
    }
  }

  // 3. Regex word boundary matching for raw and normalized text
  for (const badWord of ALL_PROFANITIES) {
    // Escape regex special chars if any
    const escaped = badWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, "i");

    if (regex.test(rawLower) || regex.test(normalized)) {
      return { hasProfanity: true, matchedWord: badWord };
    }
  }

  return { hasProfanity: false };
}

// ==========================================
// 2. SPAM PATTERNS & BOT DETECTION
// ==========================================

// Suspicious spam keywords (casinos, slots, crypto scams, pharma spam)
const SPAM_KEYWORDS: string[] = [
  "slot gacor", "judi online", "poker online", "sbobet", "bandar togel",
  "togel online", "maxwin", "pragmatic play", "deposit pulsa", "link gacor",
  "situs gacor", "situs judi", "free crypto", "crypto giveaway", "airdrop claim",
  "viagra", "cialis", "seo rank service", "cheap backlinks", "buy followers",
  "whatsapp spy", "hack account", "telegram bot invest", "doubler btc"
];

// Known temporary / disposable email providers
const DISPOSABLE_EMAIL_DOMAINS: string[] = [
  "mailinator.com", "10minutemail.com", "tempmail.com", "temp-mail.org",
  "guerrillamail.com", "sharklasers.com", "trashmail.com", "yopmail.com",
  "throwawaymail.com", "getnada.com", "dispostable.com", "fakemailgenerator.com",
  "generator.email", "maildrop.cc", "crazymailing.com", "inboxkitten.com"
];

/**
 * Checks whether an email address is from a known disposable/temporary domain.
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
}

/**
 * Analyzes content for link spam, scam keywords, or extreme repetition.
 */
export function isSpamContent(
  message: string,
  subject: string = ""
): { isSpam: boolean; reason?: string } {
  const combined = `${subject} ${message}`.toLowerCase();

  // 1. Excessive URLs check (More than 2 URLs is standard contact form spam)
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const urlMatches = combined.match(urlPattern) || [];
  if (urlMatches.length > 2) {
    return {
      isSpam: true,
      reason: "Message contains too many links (maximum 2 links allowed).",
    };
  }

  // 2. Check for spam keywords (gambling, pharma, crypto scams)
  for (const keyword of SPAM_KEYWORDS) {
    if (combined.includes(keyword)) {
      return {
        isSpam: true,
        reason: "Message contains prohibited promotional or spam content.",
      };
    }
  }

  // 3. Gibberish / Extreme character repetition (e.g. "aaaaaaaaaaaaaa...")
  const extremeRepeatPattern = /(.)\1{12,}/i;
  if (extremeRepeatPattern.test(message)) {
    return {
      isSpam: true,
      reason: "Message contains unusual repetitive character patterns.",
    };
  }

  // 4. Message length constraints
  if (message.trim().length > 2500) {
    return {
      isSpam: true,
      reason: "Message is too long (maximum 2500 characters).",
    };
  }

  return { isSpam: false };
}

// ==========================================
// 3. IN-MEMORY RATE LIMITING (Server-side)
// ==========================================

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory store (sliding window)
const ipRequestHistory = new Map<string, RateLimitRecord>();

// Configurable Rate Limit parameters
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 4; // Max 4 messages per 10 minutes
const MIN_INTERVAL_BETWEEN_REQUESTS_MS = 20 * 1000; // 20 seconds cooldown

/**
 * Clean up old entries from memory periodically to prevent memory leaks
 */
function cleanupExpiredRecords() {
  const now = Date.now();
  for (const [ip, record] of ipRequestHistory.entries()) {
    const activeTimestamps = record.timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    if (activeTimestamps.length === 0) {
      ipRequestHistory.delete(ip);
    } else {
      record.timestamps = activeTimestamps;
    }
  }
}

/**
 * Checks if the given client IP is rate limited.
 */
export function checkRateLimit(clientIp: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
  message?: string;
} {
  const now = Date.now();
  cleanupExpiredRecords();

  const ipKey = clientIp || "unknown_ip";
  const record = ipRequestHistory.get(ipKey) || { timestamps: [] };

  // Filter timestamps within the current sliding window
  const recentTimestamps = record.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  // 1. Check minimum interval cooldown between successive requests
  if (recentTimestamps.length > 0) {
    const lastTimestamp = recentTimestamps[recentTimestamps.length - 1];
    const elapsedSinceLast = now - lastTimestamp;
    if (elapsedSinceLast < MIN_INTERVAL_BETWEEN_REQUESTS_MS) {
      const waitSeconds = Math.ceil(
        (MIN_INTERVAL_BETWEEN_REQUESTS_MS - elapsedSinceLast) / 1000
      );
      return {
        allowed: false,
        retryAfterSeconds: waitSeconds,
        message: `Please wait ${waitSeconds} seconds before sending another message.`,
      };
    }
  }

  // 2. Check maximum submissions per 10-minute window
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestInWindow = recentTimestamps[0];
    const waitSeconds = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - oldestInWindow)) / 1000
    );
    return {
      allowed: false,
      retryAfterSeconds: waitSeconds,
      message: `Too many requests. Please try again in ${Math.ceil(
        waitSeconds / 60
      )} minute(s).`,
    };
  }

  // Record this valid request timestamp
  recentTimestamps.push(now);
  ipRequestHistory.set(ipKey, { timestamps: recentTimestamps });

  return { allowed: true };
}
