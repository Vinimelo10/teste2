import React, { useEffect, useState } from "react";

const Poems = () => {
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const titles = ["Dreams", "Home", "My Heart", "Love", "Sun"];
        const poemsData = [];

        for (const title of titles) {
          const response = await fetch(
            `https://poetrydb.org/title/${title}/lines.json`
          );

          if (response.ok) {
            const data = await response.json();
            poemsData.push(data[0]);
          } else {
            console.error(`Falha ao buscar o poema "${title}"`);
          }
        }

        setPoems(poemsData);
      } catch (error) {
        console.error("Erro ao buscar poemas:", error);
      }
    };

    fetchPoems();
  }, []);

  const poemStyle = {
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    marginBottom: "20px",
  };

  return (
    <div>
      {poems.map((poem, index) => (
        <div key={index} style={poemStyle}>
          <h2>{poem.title}</h2>
          <p>
            Autor: <i>{poem.author}</i>
          </p>
          {poem.lines.map((line, lineIndex) => (
            <p key={lineIndex}>{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Poems;
