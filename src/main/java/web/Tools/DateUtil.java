package web.Tools;

import java.time.LocalDate;

/**
 * Created by yqq on 2016.5.11.
 */
public class DateUtil {
    public static String dateToString(LocalDate date){
        return date.toString();
    }

    public static LocalDate stringToDate(String date){
        return  LocalDate.parse(date);
    }
}
