package web.pojo.after;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/17.
 */
public class SocialgroupPo {

    public String sgid;

    public String sgname;

    public String summary;

    public String head;

    //以下用户均有唯一标识
    public String creater;
    public ArrayList<String> managers;
    public ArrayList<String> members;

    public String getSgid() {
        return sgid;
    }

    public void setSgid(String sgid) {
        this.sgid = sgid;
    }

    public String getSgname() {
        return sgname;
    }

    public void setSgname(String sgname) {
        this.sgname = sgname;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater;
    }

    public ArrayList<String> getManagers() {
        return managers;
    }

    public void setManagers(ArrayList<String> managers) {
        this.managers = managers;
    }

    public ArrayList<String> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<String> members) {
        this.members = members;
    }
}
