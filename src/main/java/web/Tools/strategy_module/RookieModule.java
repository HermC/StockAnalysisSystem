package web.Tools.strategy_module;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.nio.Buffer;

/**
 * Created by Hermit on 16/7/26.
 */
public class RookieModule {

    private String code = "";
    private JSONObject graph = null;
    private JSONArray nodes = null;
    private JSONArray paths = null;

    public RookieModule(String input) {
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

        code += "def ";
        code += start.getString("text");
        code += ":\n";

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

        rookieTranslater(1, next, start);
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
        String content = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(new File(RookieModule.class.getResource("").getPath()+"jsonGraph.json")));
            String tmp = "";
            while((tmp=br.readLine())!=null) {
                content = content + tmp + "\n";
            }
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }

        System.out.println(content);

        RookieModule rookieModule = new RookieModule(content);

        System.out.println(rookieModule.getCode());

        new StrategyIO().fileCreater(rookieModule.getCode());
    }
}
