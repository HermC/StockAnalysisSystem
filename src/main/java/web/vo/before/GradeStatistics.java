package web.vo.before;

/**
 * Created by linyufan on 16/5/26.
 */
public class GradeStatistics {
    public String date;
    public String name;

    public void setDate(String date) {
        this.date = date;
    }

    public Double pe;
    public Double pb;
    public Double quantity;
    public Double committee;
    public Double deviation;

    public void setPe(Double pe) {
        this.pe = pe;
    }

    public void setPb(Double pb) {
        this.pb = pb;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public void setCommittee(Double committee) {
        this.committee = committee;
    }

    public void setDeviation(Double deviation) {
        this.deviation = deviation;
    }
}
