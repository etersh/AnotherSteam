// src/pages/game/[id].js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function GameDetail({ game }) {
  const router = useRouter()
  const {id} = router.query
  return (
    <>
      <h1>Game: {id}</h1>
    </>
  );
}
