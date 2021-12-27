import React, { useEffect, useState, useContext } from "react";
import Form from "./Form/Form";
import Templates from "./Templates/Templates";
import styles from "../../styles/Home/Home.module.css";
import { templates } from "./dummyData";
import { MunchContext } from "../Contexts/MunchContext";
import Head from "next/head";
import { Card } from "@mui/material";

const Home: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const {
    setTempTemplates,
  } = useContext(MunchContext);

  useEffect(() => {
    // setTempTemplates(templates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Munch Hunt: Find</title>
        <meta name="description" content="Munch Hunt helps you choose a restaurant when you are feeling indecisive" />
        <link rel="icon" href="https://i.imgur.com/Y8KaQBX.png" />
      </Head>
      <div className={styles.findContainer}>
        <Card className={styles.templatesCard}>
          <Templates
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </Card>
        <Form
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </div>
    </div>
  );
};

export default Home;
