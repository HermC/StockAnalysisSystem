import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by yqq on 2016.5.16.
 */
public class Html {

    public static void main(String args[]){

        try {
            URL url = new URL("http://vip.stock.finance.sina.com.cn/quotes_service/view/vMS_tradehistory.php?symbol=sh600232&date=2016-05-05");
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();

//            OutputStream outStrm = conn.getOutputStream();
//            System.out.println(outStrm);
//            ObjectOutputStream objOutputStrm = new ObjectOutputStream(outStrm);
//            System.out.println(objOutputStrm);

            InputStream inStrm = conn.getInputStream();
            System.out.println("aaaaa"+inStrm);

            String result =  new String(readInputStream(inStrm));
            System.out.println(result);
//            ObjectInputStream objInputStrm = new ObjectInputStream(inStrm);
//            System.out.println(objInputStrm);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    public static byte[] readInputStream(InputStream inStream) throws Exception {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = inStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, len);
        }
        byte[] data = outStream.toByteArray();
        outStream.close();
        inStream.close();
        return data;
    }
}
