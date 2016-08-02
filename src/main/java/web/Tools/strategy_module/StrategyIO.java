package web.Tools.strategy_module;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * Created by Hermit on 16/7/26.
 */
public class StrategyIO {

    private String fileName = "userStrategy.py";
    private String filePath = "python_module/";

    public void fileCreater(String code) {

        File path = new File(RookieModule.class.getResource("").getPath()+filePath);
        if(!path.exists()){
            path.mkdir();
        }

        File file = new File(path, fileName);
        if(!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
            FileWriter fw = new FileWriter(file.getCanonicalPath(), false);
            fw.write(code);
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {

    }
}
