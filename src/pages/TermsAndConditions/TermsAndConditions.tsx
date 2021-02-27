import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export default function TermsAndConditions() {
  return (
    <>
      <h1>Lietošanas noteikumi</h1>

      <h2>1. Vispārēja informācija</h2>
      <p>
        1.1. Interneta vietne brokalys.com (turpmāk – Interneta vietne) ir
        paredzēta nekustamo īpašumu paziņojumu izveidei un nekustamo īpašumu
        datu apskatei.
      </p>
      <p>
        1.2. Interneta vietni pārvalda privātpersona Matīss Jānis Āboltiņš,
        kontaktinformācija matiss@brokalys.com
      </p>
      <p>
        1.3. Pirms uzsākt Interneta vietnes lietošanu, Lietotājam jāiepazīstas
        ar šiem noteikumiem un jāapliecina piekrišana noteikumiem, aizpildot
        atbilstošu atzīmi. Ja Lietotājs nepiekrīt Interneta vietnes lietošanas
        noteikumiem, Lietotājam nav tiesības lietot šo Interneta vietni.
      </p>

      <h2>2. Personas datu apstrāde</h2>
      <p>
        2.1. Lietotājs, piesakoties saņemt nekustamo īpašumu paziņojumus,
        piekrīt šiem lietošanas noteikumiem. Pēc Lietotāja peteikšanās Interneta
        vietnē automātiski tiek izveidots Lietotāja profils.
      </p>
      <p>
        2.2. Lietotājs var atsacīties no nekustamo īpašumu paziņojumiem
        klikšķinot uz atrakstīšanās pogas, kas tiek ievietota katrā nekustamo
        īpašumu paziņojuma e-pastā.
      </p>
      <p>
        2.3. Lai pieteiktos nekustamo īpašumu paziņojumiem Interneta vietnē,
        nepieciešams ievadīt lietotāja personas datus. Apliecinot iepazīšanos ar
        Interneta vietnes lietošanas noteikumiem un Interneta vietnes privātuma
        politiku, Lietotājs apliecina, ka lūdz veikt Lietotāja personas datu
        apstrādi, lai saņemtu nekustamo īpašumu paziņojumus e-pastā.
      </p>
      <p>
        2.4. Lietotājs var piekrist, ka Interneta vietnes uzturētājs izmanto
        Lietotāja profilā norādīto e-pasta adresi komerciālu paziņojumu
        sūtīšanai par Interneta vietnes piedāvātajiem produktiem vai
        pakalpojumiem.
      </p>
      <p>
        2.5. Lietotāja datu dzēšana tiek veikta pēc Lietotāja pieprasījuma, ja
        vien šīs informācijas uzglabāšanai nepastāv cits tiesiskais pamats.
      </p>

      <h2>3. Lietotāja pienākumi</h2>
      <p>
        3.1. Lietotājam ir pienākums, veicot reģistrāciju Interneta vietnē,
        uzrādīt savus personas datus.
      </p>
      <p>
        3.2. Lietotājam ir pienākums izmantot tikai drošus elektronisko sakaru
        un datu pārraides līdzekļus un iekārtas, lai reģistrētos Interneta
        portālā.
      </p>
      <p>
        3.3. Pirms pieteikšanās nekustamo īpašumu paziņojumu saņemšanai
        iepazīties ar Lietotāja vispārējiem noteikumiem un privātuma politiku.
      </p>
      <p>
        3.4. Brokalys.com ir tiesības vienpusēji veikt izmaiņas Lietošanas
        noteikumos un Privātuma politikā. Lietotāja pienākums ir patstāvīgi
        sekot līdzi izmaiņām, regulāri pārskatot Lietošanas noteikumus un
        Privātuma politiku.
      </p>

      <h2>4. Lietotāja tiesības</h2>
      <p>
        4.1. Lietotājam ir tiesības bezmaksas izmantot Interneta vietnes
        pakalpojumus.
      </p>
      <p>4.2. Lietotājam ir tiesības pieprasīt savu ievadīto datu dzēšanu.</p>
      <p>
        4.3. Lietotājam ir tiesības pieprasīt, kad, kādām personām, kādā apjomā
        un ar kādu pamatojumu nodoti viņa personas datu. Tiesības pieprasīt šādu
        pakalpojumu bez maksas vienu reizi gadā. Lietotājam netiek sniegta
        informācija par personas datu nodošanu iestādēm, kurām ir tiesības
        apstrādāt datus bez datu subjekta piekrišanas.
      </p>

      <h2>5. Atbildības ierobežojums</h2>
      <p>
        5.1. Interneta vietne neatbild par nekustamo īpašumu paziņojumu e-pastu
        saturu patiesumu un par lietotāju rīcību saistībā ar šo informāciju.
      </p>
      <p>
        5.2. Interneta vietnes uzturētājs nav atbildīgs par bojājumiem vai
        traucējumiem Interneta vietne darbībā, ja to cēlonis ir bojājumi,
        darbības traucējumi Lietotāja iekārtās, Lietotāja e-pasta konfigurācija
        vai noslogotība, neatbilstošu vai nelicencētu iekārtu vai programmatūras
        lietošana, pārtraukums elektroenerģijas piegādē vai sakaru traucējumi
        starp Lietotāja iekārtām un Interneta vietni.
      </p>

      <h2>6. Intelektuālā īpašuma tiesības</h2>
      <p>
        6.1. Visas autora mantiskās un nemantiskās tiesības pieder
        privātpersonai Matīsam Jānim Āboltiņam. Kontaktinformācija
        matiss@brokalys.com
      </p>
      <p>
        6.2. Portāla lietotājiem aizliegts lietot portālu tam neparedzētam
        nolūkam, tajā skaitā ievadīt ievadlaukos nepieprasītu informāciju.
      </p>

      <Link to="/">
        <Icon name="arrow left" /> Atgriezties
      </Link>
    </>
  );
}
