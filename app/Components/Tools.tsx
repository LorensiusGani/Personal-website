import Image from 'next/image';

interface Tools {
  name: string;
  image: string;
}

const tools: Tools[] = [
    { name: 'Visual Studio Code', image: '/Assets/VsCode.png' },
    { name: 'Github', image: '/Assets/Github.png' },
    { name: 'Postman', image: '/Assets/Postman-1.png' },
    { name: 'Trello', image: '/Assets/Trello.png' },
    { name: "Figma", image: "/Assets/Figma.png" },
    { name: "Spreadsheets", image: "/Assets/Spreadsheets.png" },
    { name: "Agile Methodology", image: "/Assets/Agile-Method.png" },
    { name: "RestAPI", image: "/Assets/RestAPI.png" },
];

export default function Tools() {
    return (
        <>
        <div className="text-center py-10">
                <h1 className="text-3xl md:text-5xl font-bold">Tools & Methodology</h1>
              </div>
        
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
                {tools.map((tool: Tools, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 flex flex-col items-center hover:scale-105 transition duration-300 shadow-md"
                  >
                    <div className="w-30 h-30 flex items-center justify-center">
                      <Image
                        src={tool.image}
                        alt={tool.name}
                        width={150}
                        height={150}
                        className="object-fill max-h-full max-w-full"
                      />
                    </div>
                    <h3 className="text-black mt-4 text-xl font-semibold text-center">
                      {tool.name}
                    </h3>
                  </div>
                ))}
              </div>
        </>
    )
}