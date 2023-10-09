
import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { invoke } from "@tauri-apps/api";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [dbId, setDbId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isSetting, setIsSetting] = useState(false);
  const [copyText, setCopyText] = useState("");

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

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      sendReqwestToNotion(e);
    }
  };

  const sendReqwestToNotion = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const promise = invoke('run', {copyText});
    const lines = copyText.split('\n');
    const word = lines[1];
    setCopyText("");
    toast.promise(
      promise,
      {
        success: `Notionに '${word}' を追加しました`,
        loading: `Notionに '${word}' を追加中...`,
        error: `エラー '${word}' : 以下の項目を確認してください
                                \nシークレットキーとデータベースIDが合っているか確認してください
                                \nコピー文のテンプレートが合っているか確認してください`,
      }
    )
    const result = await promise;
    if (typeof result === 'string') {
      console.log(`Err: ${result}`);
      return;
    }
  };
  
  return(
    <div className="bg-gray-200">
      { isSetting ? (
        <div className="flex flex-col h-screen items-center justify-center">
          <ul className="m-3">
            <li><p>①コピーしたテキストをペースト(cmd + v)</p></li>
            <li><p>②Enter</p></li>
          </ul>
            <textarea 
              className="border h-[66vh] w-[66vw] resize-none rounded-md py-2 px-2"
              onChange={(e) => setCopyText(e.target.value)}
              value={copyText}
              onKeyDown={(e) => handleKeyDown(e)}
            />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
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

      {/* どのように通知を出すか */}
      <Toaster
        position="top-left"
        toastOptions={{
          className:'bg-gray-50 dark:bg-slate-600 dark:text-white rounded-md shadow-md'
        }}
      />
    </div>
    
  )
}

export default App;
