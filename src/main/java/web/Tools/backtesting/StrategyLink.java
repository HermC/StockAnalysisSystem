package web.Tools.backtesting;

import java.io.FileWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.lang.ClassLoader;

/**
 * Created by NJU on 2016/9/4.
 */
public class StrategyLink {
    private Statement stmt;
    private Connection conn;
    private int sid;

    public StrategyLink(int sid) {
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
        int userid = -1;
        try {
            String sql = "select `userid` from `strategy` where `sid`= " + String.valueOf(sid);    //要执行的SQL
            ResultSet rs = stmt.executeQuery(sql);//创建数据对象
            rs.next();
            userid = Integer.parseInt(rs.getString(1));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userid;
    }

    public void getPy() {
        try {
            String sql = "select `py_text` from `strategy` where `sid`= " + String.valueOf(sid);    //要执行的SQL
            ResultSet rs = stmt.executeQuery(sql);//创建数据对象

//            System.out.println(ClassLoader);
            String path = System.getProperty("user.home") ;
            String system = System.getProperties().getProperty("os.name").toLowerCase();
//        System.out.println(system);
            if (system.contains("windows")) {
                path += "\\";
//                path = path.substring(1);
            }
            else {
                path += "/";
            }

            path += "strategy_" + String.valueOf(sid) + ".py";

            rs.next();
            String[] text = (rs.getString(1)).split("\n");
            FileWriter writer = new FileWriter(path);
            for (int i = 0; i < text.length; i++) {
                writer.write(text[i] + "\n");
            }
            writer.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    public String getSname() {
        String name = "";
        try {
            String sql = "select `sname` from `strategy` where `sid`= " + String.valueOf(sid);    //要执行的SQL
            ResultSet rs = stmt.executeQuery(sql);//创建数据对象
            rs.next();
            name = (rs.getString(1));
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return name;
    }


}
