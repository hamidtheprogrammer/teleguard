import { Card } from "@/components/ui/card";
import React from "react";

const Home = () => {
  return (
    <div className="pl-1 h-full">
      <Card className="h-full flex flex-col justify-center items-center gap-3">
        <img width={400} height={500} src="./assets/homeImg.jpeg" alt="" />
        <h1 className="uppercase text-2xl">Nothing to see here folks :(</h1>
      </Card>
    </div>
  );
};

export default Home;
