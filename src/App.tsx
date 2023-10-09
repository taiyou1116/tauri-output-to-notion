
import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { invoke } from "@tauri-apps/api";

function App() {
  const [dbId, setDbId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      let result;
      try {
        result = await invoke('verify_api_key_on_startup');
        setIsSetting(true);
      } catch {
        console.log(`Err: ${result}`);
      }
    };
    initialize();
  }, []);

  const saveSecretKeyAndDbId = async () => {
    const result = await invoke('save_secret_key_and_db_id', {secretKey, dbId});
    if (typeof result === 'string') {
      console.log(`Err: ${result}`);
      return;
    }
    setIsSetting(true);
  }
  
  return(
    <div>
      { isSetting ? (
        <h1>北</h1>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen gap-5 bg-gray-200">
          <h1 className="font-bold text-2xl">初期設定</h1>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="シークレットキーを入力" 
              className="px-4 py-2 border rounded-md"
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="データベースIDを入力" 
              className="px-4 py-2 border rounded-md"
              onChange={(e) => setDbId(e.target.value)}
            />
          </div>
          <Button 
            text="シークレットキー保存"
            variant="primary"
            onClick={() => saveSecretKeyAndDbId()}
          />
        </div>
      )}
    </div>
    
  )
}

export default App;
