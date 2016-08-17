package web.Tools;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.CropImageFilter;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;
import java.io.File;
import java.io.IOException;

/**
 * Created by Hermit on 16/8/16.
 */
public class ImageCut {

    public String cutImage(String imagePath, int x, int y, int w, int h, int realWidth, int realHeight) {
        Image img;
        ImageFilter cropFilter;

        try {
            BufferedImage bufferedImage = ImageIO.read(new File(imagePath));
            int srcWidth = bufferedImage.getWidth();
            int srcHeight = bufferedImage.getHeight();

            double wScale = ((double)srcWidth) / ((double)realWidth);
            double hScale = ((double)srcHeight) / ((double)realHeight);

            int x1 = (int) (x * wScale);
            int y1 = (int) (y * hScale);
            int w1 = (int) (w * wScale);
            int h1 = (int) (h * hScale);

            Image image = bufferedImage.getScaledInstance(srcWidth, srcHeight, Image.SCALE_DEFAULT);

            cropFilter = new CropImageFilter(x1, y1, w1, h1);
            img = Toolkit.getDefaultToolkit().createImage(
                    new FilteredImageSource(image.getSource(), cropFilter));
            BufferedImage tag = new BufferedImage(w1, h1, BufferedImage.TYPE_INT_BGR);
            Graphics g = tag.getGraphics();
            g.drawImage(img, 0, 0, null);
            g.dispose();

            ImageIO.write(tag, "PNG", new File(imagePath));

        } catch (IOException e) {
            e.printStackTrace();
        }

        return imagePath;
    }
}
