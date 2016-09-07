package web.Tools.backtesting;

import java.io.File;

/**
 * Created by NJU on 2016/9/4.
 */
public class BackTesting {
    private int sid;
    private int userid;
    private String resultname;

    private BacktestingLink backtestingLink;
    private StrategyLink strategyLink;
    private ResultLink resultLink;

    public BackTesting(int sid, int userid) {
        BacktestingLink backtestingLink = new BacktestingLink(sid, userid);
        StrategyLink strategyLink = new StrategyLink(sid);
        this.backtestingLink = backtestingLink;
        this.strategyLink = strategyLink;
        this.sid = backtestingLink.getSid();
        this.userid = backtestingLink.getUserid();
        this.resultname = backtestingLink.getResultName();
        this.resultLink = new ResultLink(resultname);
    }

//    public void getPyCode() {
//        strategyLink.getPy();
////    }

    public boolean runBacktesting() {
        boolean isSaved = false;
        strategyLink.getPy();

        String path = ClassLoader.getSystemResource("").getPath();
        String cmd = "";
        String system = System.getProperties().getProperty("os.name").toLowerCase();
//        System.out.println(system);
        if (system.contains("windows")) {
            path = path.substring(1);
            cmd += "cmd.exe /c start ";
        }
        else if (system.contains("mac")) {
//            cmd += "/bin/sh -c ";
        }
        else if(system.contains(("linux"))) {

        }
        String start = backtestingLink.getStartTime();
        String end = backtestingLink.getEndTime();


        String scriptPath = path + "strategy_" + String.valueOf(sid) + ".py";
        String outPath = path + resultname + ".pkl";

        cmd += "rqalpha run -f " + scriptPath + " -s " + start + " -e " + end + " -o " +  outPath;
        System.out.println(cmd);
        Runtime run = Runtime.getRuntime();
        try {
            Process process = run.exec(cmd);
            process.waitFor();
            process.destroy();

            File file=new File(outPath);
            long startTime=System.currentTimeMillis();
            long endTime=System.currentTimeMillis();
            while (!file.exists()) {
                if (endTime - startTime >= 3000) {
                    break;
                }
            }
            isSaved = file.exists();
            if (isSaved) {
                resultLink.saveToDB();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isSaved;
    }

//    public void saveToDB() {
//        resultLink.saveToDB();
//    }

    public static void main(String[] args) {
        BackTesting backTesting = new BackTesting(8, 3);
//        System.out.println("===========os.name:"+System.getProperties().getProperty("os.name"));
//        backTesting.getPyCode();
        backTesting.runBacktesting();
//        backTesting.saveToDB();

    }

}
