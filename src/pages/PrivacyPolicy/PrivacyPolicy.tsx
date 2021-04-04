import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export default function PrivacyPolicy() {
  return (
    <div>
      <h1>Privātuma politika</h1>
      <p>
        Brokalys vietnes uzturētājs un pārzinis (fiziska persona – Matīss Jānis
        Āboltiņš) aizsargā un rūpējas par šīs interneta vietnes apmeklētāju
        privātumu un personas datu aizsardzību, apņemas ievērot Jūsu tiesības uz
        personas datu tiesisku apstrādi un aizsardzību, kā arī ievērot Fizisko
        personu datu aizsardzības likumu, EIROPAS PARLAMENTA UN PADOMES REGULU
        (ES) 2016/679 (2016. gada 27. aprīlis) par fizisku personu aizsardzību
        attiecībā uz personas datu apstrādi un šādu datu brīvu apriti un ar ko
        atceļ Direktīvu 95/46/EK (Vispārīgā datu aizsardzības regula) un citus
        normatīvos aktus, ja tādi ir piemērojami datu apstrādei.
      </p>
      <p>
        Šī privātuma politika sniedz informāciju par to, kā vietnes uzturētājs
        apstrādā Jūsu personas datus, kad Jūs saņemat Brokalys vietnes e-pasta
        paziņojumus.
      </p>
      <p>
        Izmantojot sniegtos interneta pakalpojumus Jūs piekrītat, ka jebkura
        Jūsu sniegtā informācija tiek apstrādāta un uzglabāta atbilstoši šai
        privātuma politikai.
      </p>

      <h2>Datu apstrādes mērķis</h2>
      <p>
        Datu apstrāde tiek veikta, lai nodrošinātu, ka Broklays klients saņem
        savā norādītajā e-pasta adresē nekustamo īpašumu paziņojumus.
      </p>

      <h2>Identificējamās informācijas pielietošana</h2>
      <p>Vietnes uzturētājs var izmantot Jūsu personas datus, lai:</p>
      <ul>
        <li>
          Nodrošinātu Jums iespēju saņemt Brokalys interneta vietnes pieejamos
          pakalpojumus; Nosūtītu Jums e-pasta ziņojumus par vietnes uzlabojumiem
          vai lai informētu jūs par jaunumiem;
        </li>
        <li>Atbildētu uz Jūsu informācijas pieprasījumiem.</li>
      </ul>

      <h2>Saites uz trešo personu tīmekļa vietnēm un atsauces</h2>
      <p>
        Brokalys nekustamo īpašumu paziņojumu e-pasti var saturēt saites uz
        trešo personu tīmekļa vietnēm, kam ir savas privātuma, kā arī datu
        vākšana, izmantošanas un izpaušanas politikas. Lūdzu, pirms lietošanas
        iepazīstieties ar to noteikumiem un privātuma politikām. Brokalys
        vietnes uzturētājs neatbild par trešo personu tīmekļu vietņu privātuma
        ievērošanas praksi, sniegto pakalpojumu pieejamību vai uzticamību, vai
        par to satura precizitāti vai pilnīgumu.
      </p>

      <h2>Informācijas izpaušana</h2>
      <p>
        Jūsu informācija netiks izpausta trešajām pusēm, izņemot gadījumus, kad
        vietnes uzturētājs būs saņēmis skaidri izteiktu Jūsu piekrišanu vai arī
        informācijas izpaušana tiks pieprasīta saskaņā ar likumdošanas prasībām.
      </p>

      <h2>Informācijas labošana/ atjaunināšana</h2>
      <p>
        Ja Jūs vēlaties pārskatīt, labot, atjaunināt vai vēlaties aizliegt
        pārvaldīt Jūsu iepriekš sniegto informāciju, sazinieties ar vietnes
        pārvaldītāju elektroniski lietojot e-pasta adresi matiss@brokalys.com
      </p>

      <h2>Izmaiņas privātuma politikā</h2>
      <p>
        Šī privātuma politika var tikt mainīt bez iepriekšēja brīdinājuma.
        Jaunākā privātuma politikas versija, kas ir publicētā vietnē
        https://pinger.brokalys.com/#/privacy-policy, aizstāj visas iepriekšējās
        privātuma politikas versijas.
      </p>

      <Link to="/">
        <Icon name="arrow left" /> Atgriezties
      </Link>
    </div>
  );
}
