package web.Tools;

/**
 * Created by NJU on 2016/6/4.
 */
public class HexToChinese {
    public static String decode(String content) {
        boolean isDecoding = false;
        String result = "";
        int i = 0;
        while(i!=content.length()) {
            if(!isDecoding) {
                if ((content.charAt(i) == '\\') && (content.charAt(i+1) == 'u')) {
                    isDecoding = true;
                    i += 2;
                }
                else {
                    result += content.charAt(i);
                    i++;
                }
            }
            else {
                String temp = content.substring(i, i+4);
                i += 4;
                isDecoding = false;
                result += deUnicode(temp);
            }
        }
        return result;
    }

    public static String deUnicode(String content){//将16进制数转换为汉字
        String enUnicode=null;
        String deUnicode=null;
        for(int i=0;i<4;i++){
            if(enUnicode==null){
                enUnicode=String.valueOf(content.charAt(i));
            }else{
                enUnicode=enUnicode+content.charAt(i);
            }
            if(i%4==3){
                if(enUnicode!=null){
                    if(deUnicode==null){
                        deUnicode=String.valueOf((char)Integer.valueOf(enUnicode, 16).intValue());
                    }else{
                        deUnicode=deUnicode+String.valueOf((char)Integer.valueOf(enUnicode, 16).intValue());
                    }
                }
                enUnicode=null;
            }

        }
        return deUnicode;
    }
}
