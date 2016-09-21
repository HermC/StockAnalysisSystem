package web.Tools.strategy_module;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.nio.Buffer;
import java.util.ArrayList;

/**
 * Created by Hermit on 16/7/26.
 */
public class RookieModule {

    private static final String HEADER = "" +
            "import talib\n" +
            "from rqalpha.api import history, plot, order_target_value, order_shares\n\n";
    private static final String INIT = "" +
            "def init(context):\n";

    private String code = "";
    private JSONObject graph = null;
    private JSONArray nodes = null;
    private JSONArray paths = null;

    public RookieModule(String input, ArrayList<String> stocks) {
        try {
            graph = JSONObject.parseObject(input);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if(graph==null){
            return;
        }

        nodes = graph.getJSONArray("nodes");
        paths = graph.getJSONArray("edges");

        if(nodes==null||paths==null){
            return;
        }

        JSONObject start = null;

        for(int i=0;i<nodes.size();i++){
            start = nodes.getJSONObject(i);
            if(start.getString("type").equals("start")){
                break;
            }
        }

        if(start==null){
            return;
        }

        code += HEADER;

        code += INIT;

        for(int i=0;i<stocks.size();i++){
            code += "\tcontext.s"+i+"='";
            String stock = stocks.get(i);
            code += stock.substring(2, stock.length());

            if(stock.contains("sh")){
                code += ".XSHG";
            }else if(stock.contains("sz")){
                code += ".XSHE";
            }

            code += "'\n";
        }

        code += "\tcontext.stocks=[";

        for(int i=0;i<stocks.size();i++){
            code += "context.s"+i;
            if(i==stocks.size()-1){
                code += "]";
            }else{
                code += ",";
            }
        }

        code += "\n";

        code += "\tcontext.SHORTPERIOD = 20\n" +
                "\tcontext.LONGPERIOD = 120\n";

        code += "def ";
        code += "handle_bar(context, bar_dict):\n";

        code += "\tfor each in context.stocks:\n";

        JSONObject next = null;

        for(int i=0;i<paths.size();i++){
            JSONObject path = paths.getJSONObject(i);
            if(path.getString("source").equals(start.getString("id"))){
                String nextID = path.getString("target");
                for(int j=0;j<nodes.size();i++){
                    JSONObject node = nodes.getJSONObject(i);
                    if(node.getString("id").equals(nextID)){
                        next = node;
                        break;
                    }
                }
                break;
            }
        }

        if(next==null){
            return;
        }

        rookieTranslater(2, next, start);
    }

    private void aliningCode(int layer, String text) {
        for(int i=0;i<layer;i++){
            code += "\t";
        }
        code += text;
        code += "\n";
    }

    private boolean isLoopStart(JSONObject node, JSONObject check) {
        if(node.getString(check.getString("id"))!=null){
            return false;
        }
        check.put(node.getString("id"), true);

        boolean isLoopStart = false;
        JSONArray nextNodes = new JSONArray();
        for(int i=0;i<paths.size();i++){
            JSONObject path = paths.getJSONObject(i);
            if(path.getString("source").equals(check.getString("id"))
                    &&path.getString("target").equals(node.getString("id"))){
                return true;
            }
            if(path.getString("source").equals(check.getString("id"))){
                String s = path.getString("target");
                for(int j=0;j<nodes.size();j++){
                    JSONObject n = nodes.getJSONObject(j);
                    if(n.getString("id").equals(s)){
                        nextNodes.add(n);
                    }
                }
            }
        }
        for(int i=0;i<nextNodes.size();i++){
            isLoopStart = isLoopStart(node, nextNodes.getJSONObject(i));
            if(isLoopStart) break;
        }
        return isLoopStart;
    }

    private boolean isLoopEnd(JSONObject node) {
        for(int i=0;i<paths.size();i++){
            JSONObject path = paths.getJSONObject(i);
            if(path.getString("source").equals(node.getString("id"))){
                String nextNodeID = path.getString("target");
                if(node.getString(nextNodeID)!=null){
                    return true;
                }
            }
        }
        return false;
    }

    private void rookieTranslater(int layer, JSONObject node, JSONObject preNode) {
        if(node==null){
            return;
        }

        boolean isLoopStart = isLoopStart(node, node);

        if(isLoopStart){
            if(node.getString("type").equals("question")){
                aliningCode(layer, "while "+node.getString("text")+":");
                JSONObject tNode = null;
                JSONObject fNode = null;

                for(int i=0;i<paths.size();i++){
                    JSONObject path = paths.getJSONObject(i);
                    if(path.getString("source").equals(node.getString("id"))){
                        JSONObject data = path.getJSONObject("data");
                        String choice = data.getString("label");
                        if(choice.equals("yes")){
                            String tNodeID = path.getString("target");
                            for(int j=0;j<nodes.size();j++){
                                JSONObject targetNode = nodes.getJSONObject(j);
                                if(targetNode.getString("id").equals(tNodeID)){
                                    tNode = targetNode;
                                    break;
                                }
                            }
                        }else if(choice.equals("no")){
                            String fNodeID = path.getString("target");
                            for(int j=0;j<nodes.size();j++){
                                JSONObject targetNode = nodes.getJSONObject(j);
                                if(targetNode.getString("id").equals(fNodeID)){
                                    fNode = targetNode;
                                    break;
                                }
                            }
                        }
                    }
                }

                System.out.println(tNode);
                if(tNode!=null){
                    rookieTranslater(layer+1, tNode, node);
                }
                if(fNode!=null){
                    rookieTranslater(layer, fNode, node);
                }
            }else{

            }
        }else{
            if(node.getString("type").equals("question")){
                JSONObject tNode = null;
                JSONObject fNode = null;

                for(int i=0;i<paths.size();i++){
                    JSONObject path = paths.getJSONObject(i);
                    if(path.getString("source").equals(node.getString("id"))){
                        JSONObject data = path.getJSONObject("data");
                        String choice = data.getString("label");
                        if(choice.equals("yes")){
                            String tNodeID = path.getString("target");
                            for(int j=0;j<nodes.size();j++){
                                JSONObject targetNode = nodes.getJSONObject(j);
                                if(targetNode.getString("id").equals(tNodeID)){
                                    tNode = targetNode;
                                    break;
                                }
                            }
                        }else if(choice.equals("no")){
                            String fNodeID = path.getString("target");
                            for(int j=0;j<nodes.size();j++){
                                JSONObject targetNode = nodes.getJSONObject(j);
                                if(targetNode.getString("id").equals(fNodeID)){
                                    fNode = targetNode;
                                    break;
                                }
                            }
                        }
                    }
                }

                if(isLoopEnd(node)) return;

                if(tNode!=null){
                    aliningCode(layer, "if "+node.getString("text")+":");
                    rookieTranslater(layer+1, tNode, node);
                }
                if(fNode!=null){
                    aliningCode(layer, "else:");
                    rookieTranslater(layer+1, fNode, node);
                }
            }else{
                aliningCode(layer, node.getString("text"));

                JSONObject next = null;

                for(int i=0;i<paths.size();i++){
                    JSONObject path = paths.getJSONObject(i);
                    if(path.getString("source").equals(node.getString("id"))){
                        String nextID = path.getString("target");
                        for(int j=0;j<nodes.size();j++){
                            JSONObject tmp = nodes.getJSONObject(j);
                            if(tmp.getString("id").equals(nextID)){
                                next = tmp;
                                break;
                            }
                        }
                        break;
                    }
                }

//                System.out.println(node.getString("text")+":"+next);

                if(isLoopEnd(node)) return;

                rookieTranslater(layer, next, node);
            }
        }
    }

    public String getCode() {
        return code;
    }

    public static void main(String[] args) {
        String content;
        content = "{\"nodes\":[{\"id\":\"start\",\"type\":\"start\",\"text\":\"Start\",\"left\":50,\"top\":50,\"w\":100,\"h\":70},{\"w\":539.3431572120841,\"h\":82,\"type\":\"action\",\"left\":254,\"top\":169,\"text\":\"prices = history(context.LONGPERIOD+1,'1d','close')[context.s1].values\",\"id\":\"6ee88f19-c755-4686-a0a5-ecd6a308d390\"},{\"w\":424.26290661015184,\"h\":69,\"type\":\"action\",\"left\":310,\"top\":378,\"text\":\"short_avg = talib.SMA(prices,context.SHORTPERIOD)\",\"id\":\"6648300a-cf15-4460-8575-8e54d03c8143\"},{\"w\":459.11829127600686,\"h\":91.52854971131842,\"type\":\"action\",\"left\":1850,\"top\":74,\"text\":\"long_avg = talib.SMA(prices,context.LONGPERIOD)\",\"id\":\"718a04e2-8574-4f11-8dbc-847494e77c30\"},{\"w\":353.0520058595116,\"h\":82.26264083358751,\"type\":\"action\",\"left\":416,\"top\":886,\"text\":\"plot('short avg',short_avg[-1])\",\"id\":\"eddf0195-8fec-44c9-8bfb-2ad8a4b86826\"},{\"w\":284.57936247808493,\"h\":60.56149262069857,\"type\":\"action\",\"left\":2109,\"top\":571,\"text\":\"plot('long avg',long_avg[-1])\",\"id\":\"b6501e09-8375-4bfa-87bd-2b2621ca91bc\"},{\"w\":408.98580970561386,\"h\":70.92869655632603,\"type\":\"action\",\"left\":2184,\"top\":749,\"text\":\"curPosition = context.portfolio.positions[context.s1].quantity\",\"id\":\"7ce8d092-c834-452f-b3da-a41ac1696292\"},{\"w\":563.0784865838027,\"h\":63.63279606437277,\"type\":\"action\",\"left\":2050,\"top\":940,\"text\":\"shares = context.portfolio.cash/bar_dict[context.s1].close\",\"id\":\"5ecafa8e-da82-4542-946f-e339ef4da321\"},{\"w\":628.4452872053644,\"h\":154.56554716731648,\"type\":\"question\",\"left\":2170,\"top\":1287,\"text\":\"short_avg[-1]-long_avg[-1]<0 and short_avg[-2]-long_avg[-2]>0 and curPosition>0:\",\"id\":\"98e71409-f9df-481a-942e-c2a54e512156\"},{\"w\":120,\"h\":80,\"type\":\"action\",\"left\":1882,\"top\":1507,\"text\":\"order_target_value(context.s1,0)\",\"id\":\"ffcb9e6a-d582-4da6-9816-0d8bcc29f222\"},{\"w\":751.9748702978623,\"h\":109.62382204521214,\"type\":\"question\",\"left\":2154,\"top\":1578,\"text\":\"short_avg[-1]-long_avg[-1]>0 and short_avg[-2]-long_avg[-2]<0:\",\"id\":\"cbfc3b6c-c9c8-4360-9711-c8a246dcd8a1\"},{\"w\":368.43741543537726,\"h\":82.27924234344391,\"type\":\"action\",\"left\":2462,\"top\":1885,\"text\":\"order_shares(context.s1,shares)\",\"id\":\"8dcceeea-f3a6-451e-b7bd-3456dcc8c853\"}],\"edges\":[{\"source\":\"start\",\"target\":\"6ee88f19-c755-4686-a0a5-ecd6a308d390\",\"data\":{\"label\":\"\",\"id\":\"fd9d7f57-cbd7-42ad-83d4-24d4d9f6d29b\",\"type\":\"default\"}},{\"source\":\"6ee88f19-c755-4686-a0a5-ecd6a308d390\",\"target\":\"6648300a-cf15-4460-8575-8e54d03c8143\",\"data\":{\"label\":\" \",\"id\":\"b73619f6-033f-4782-95f8-6f33fc972598\",\"type\":\"connection\"}},{\"source\":\"6648300a-cf15-4460-8575-8e54d03c8143\",\"target\":\"718a04e2-8574-4f11-8dbc-847494e77c30\",\"data\":{\"label\":\"\",\"id\":\"d96089ad-ed56-45cf-88e7-26061d8bad2d\",\"type\":\"connection\"}},{\"source\":\"718a04e2-8574-4f11-8dbc-847494e77c30\",\"target\":\"eddf0195-8fec-44c9-8bfb-2ad8a4b86826\",\"data\":{\"label\":\"\",\"id\":\"ecf06eca-863c-4f3e-9bdf-f8b5def80f43\",\"type\":\"connection\"}},{\"source\":\"eddf0195-8fec-44c9-8bfb-2ad8a4b86826\",\"target\":\"b6501e09-8375-4bfa-87bd-2b2621ca91bc\",\"data\":{\"label\":\"\",\"id\":\"3d2b908b-018c-4c85-93b5-d3ce564f6075\",\"type\":\"connection\"}},{\"source\":\"b6501e09-8375-4bfa-87bd-2b2621ca91bc\",\"target\":\"7ce8d092-c834-452f-b3da-a41ac1696292\",\"data\":{\"label\":\"\",\"id\":\"15c64cd1-1159-4ddf-b76d-736ce464ebdc\",\"type\":\"connection\"}},{\"source\":\"7ce8d092-c834-452f-b3da-a41ac1696292\",\"target\":\"5ecafa8e-da82-4542-946f-e339ef4da321\",\"data\":{\"label\":\"\",\"id\":\"d3b3ab27-9777-411a-8836-06e799a9511a\",\"type\":\"connection\"}},{\"source\":\"5ecafa8e-da82-4542-946f-e339ef4da321\",\"target\":\"98e71409-f9df-481a-942e-c2a54e512156\",\"data\":{\"label\":\"\",\"id\":\"7c34c959-fc81-42f5-8ce8-c26313bb3b7b\",\"type\":\"connection\"}},{\"source\":\"98e71409-f9df-481a-942e-c2a54e512156\",\"target\":\"ffcb9e6a-d582-4da6-9816-0d8bcc29f222\",\"data\":{\"label\":\"yes\",\"id\":\"6bf6892c-fd89-4d87-bfc0-823b64e10d0f\",\"type\":\"connection\"}},{\"source\":\"98e71409-f9df-481a-942e-c2a54e512156\",\"target\":\"cbfc3b6c-c9c8-4360-9711-c8a246dcd8a1\",\"data\":{\"label\":\"no\",\"id\":\"b1a4fb18-1dfa-49b1-a6fa-8c4db074c577\",\"type\":\"connection\"}},{\"source\":\"ffcb9e6a-d582-4da6-9816-0d8bcc29f222\",\"target\":\"cbfc3b6c-c9c8-4360-9711-c8a246dcd8a1\",\"data\":{\"label\":\"\",\"id\":\"8b6c3464-191a-4db8-83a9-0189b47c2484\",\"type\":\"connection\"}},{\"source\":\"cbfc3b6c-c9c8-4360-9711-c8a246dcd8a1\",\"target\":\"8dcceeea-f3a6-451e-b7bd-3456dcc8c853\",\"data\":{\"label\":\"yes\",\"id\":\"109b0d1e-f854-416c-94b5-bfd865ee4ca7\",\"type\":\"connection\"}}],\"ports\":[]}";

//        try {
//            BufferedReader br = new BufferedReader(new FileReader(new File(RookieModule.class.getResource("").getPath()+"jsonGraph.json")));
//            String tmp = "";
//            while((tmp=br.readLine())!=null) {
//                content = content + tmp + "\n";
//            }
//        } catch (java.io.IOException e) {
//            e.printStackTrace();
//        }

        System.out.println(content);

        ArrayList<String> stock = new ArrayList<>();
        stock.add("sh600000");
        stock.add("sz000001");

        RookieModule rookieModule = new RookieModule(content, stock);

        System.out.println(rookieModule.getCode());

        new StrategyIO().fileCreater(rookieModule.getCode());
    }
}
