
import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [dbId, setDbId] = useState("");
  const [key, setKey] = useState("");

  const saveKey = () => {
    
  }

  const saveDbId = () => {

  }


  return(
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="font-bold text-2xl">初期設定</h1>
      <div className="flex gap-3 items-start">
        <input 
          type="text" 
          placeholder="シークレットキーを入力" 
          className="px-4 py-2 border rounded-md"
          onChange={(e) => setKey(e.target.value)}
        />
        <Button 
          text="シークレットキー保存"
          variant="primary"
          onClick={() => saveKey()}
        />
      </div>
      <div className="flex gap-3 items-start">
        <input 
          type="text" 
          placeholder="データベースIDを入力" 
          className="px-4 py-2 border rounded-md"
          onChange={(e) => setDbId(e.target.value)}
        />
        <Button 
          text="データベースIDを保存"
          variant="primary"
          onClick={() => saveDbId()}
        />
      </div>
    </div>
  )
}

export default App;
