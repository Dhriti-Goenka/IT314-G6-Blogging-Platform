// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class FollowUnfollowTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void followUnfollow() {
    driver.get("https://it-314-g6-blogging-platform.vercel.app/");
    driver.manage().window().setSize(new Dimension(1552, 832));
    js.executeScript("window.scrollTo(0,499.20001220703125)");
    js.executeScript("window.scrollTo(0,460.79998779296875)");
    driver.findElement(By.cssSelector(".Home_section__3569L:nth-child(1) .Home_card__E5spL:nth-child(3) > .Home_readMore__VVJjF")).click();
    driver.findElement(By.cssSelector(".showBlog_followBtn__QLPBL")).click();
    driver.findElement(By.cssSelector(".showBlog_followBtn__QLPBL")).click();
  }
}
