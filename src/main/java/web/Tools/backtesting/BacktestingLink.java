package web.Tools.backtesting;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Created by NJU on 2016/9/4.
 */
public class BacktestingLink {
    private Statement stmt;
    private Connection conn;
    private int sid;
    private int userid;

    public BacktestingLink(int sid, int userid) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("成功加载MySQL驱动！");

            String url = "jdbc:mysql://572b2568442c7.sh.cdb.myqcloud.com:8161/dracarys";    //JDBC的URL
            Connection conn;

            conn = DriverManager.getConnection(url, "cdb_outerroot", "software2015");
            Statement stmt = conn.createStatement(); //创建Statement对象
            System.out.println("成功连接到数据库！");
            this.stmt = stmt;
            this.sid = sid;
            this.conn = conn;
            this.userid = userid;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            this.stmt.close();
            this.conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int getUserid() {
//        int userid = -1;
//        try {
//            String sql = "select `userid` from `backtesting` where `sid`= " + String.valueOf(sid);    //要执行的SQL
//            ResultSet rs = stmt.executeQuery(sql);//创建数据对象
//            rs.next();
//            userid = Integer.parseInt(rs.getString(1));
//            rs.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        return this.userid;
    }

    public int getSid() {
        return this.sid;
    }

    public String getStartTime() {
        String time = "";
        try {
            String sql = "select `start` from `backtesting` where `sid`= " + String.valueOf(sid);    //要执行的SQL
            ResultSet rs = stmt.executeQuery(sql);//创建数据对象
            rs.next();
            time = (rs.getString(1));
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return time;
    }

    public String getEndTime() {
        String time = "";
        try {
            String sql = "select `end` from `backtesting` where `sid`= " + String.valueOf(sid);    //要执行的SQL
            ResultSet rs = stmt.executeQuery(sql);//创建数据对象
            rs.next();
            time = (rs.getString(1));
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return time;
    }

    public String getResultName() {
        String result = "";
        try {
            String sql = "select `resultid` from `backtesting` where `sid`= " + String.valueOf(sid);    //要执行的SQL
            ResultSet rs = stmt.executeQuery(sql);//创建数据对象
            rs.next();
            result = "result_" + (rs.getString(1));
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}

