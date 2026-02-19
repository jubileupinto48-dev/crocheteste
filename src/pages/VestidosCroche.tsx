import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

// Import AI-generated dress images
import vestidoAngelPreview from "@/assets/vestidos/vestido-angel-preview.jpg";
import vestidoAngelDiagram from "@/assets/vestidos/vestido-angel-diagram.jpg";
import saidaMelMaiaPreview from "@/assets/vestidos/saida-mel-maia-preview.jpg";
import saidaMelMaiaDiagram from "@/assets/vestidos/saida-mel-maia-diagram.jpg";
import vestidoMariaPreview from "@/assets/vestidos/vestido-maria-preview.jpg";
import vestidoMariaDiagram from "@/assets/vestidos/vestido-maria-diagram.jpg";
import vestidoJulianaPaesPreview from "@/assets/vestidos/vestido-juliana-paes-preview.jpg";
import vestidoJulianaPaesDiagram from "@/assets/vestidos/vestido-juliana-paes-diagram.jpg";
import vestidoLongoDiagram from "@/assets/vestidos/vestido-longo-diagram.jpg";
import vestidoDecoteVDiagram from "@/assets/vestidos/vestido-decote-v-diagram.jpg";
import vestidoCiganinhaDiagram from "@/assets/vestidos/vestido-ciganinha-diagram.jpg";
import vestidoLuxoDiagram from "@/assets/vestidos/vestido-luxo-diagram.jpg";
import vestidoCleopatraDiagram from "@/assets/vestidos/vestido-cleopatra-diagram.jpg";
import vestidoVirginiaDiagram from "@/assets/vestidos/vestido-virginia-diagram.jpg";

// Map of project names to their graphics
const projectGraphics: Record<string, { preview: string; diagram: string }> = {
  "Vestido Angel": { preview: vestidoAngelPreview, diagram: vestidoAngelDiagram },
  "Saída Mel Maia": { preview: saidaMelMaiaPreview, diagram: saidaMelMaiaDiagram },
  "Vestido Maria": { preview: vestidoMariaPreview, diagram: vestidoMariaDiagram },
  "Vestido Juliana Paes": { preview: vestidoJulianaPaesPreview, diagram: vestidoJulianaPaesDiagram },
};

// Map of video IDs to their diagram images (for videos 1-8 that share "Destaque" project)
const videoDiagrams: Record<string, string> = {
  "1165908032?h=4e8257a515": vestidoLongoDiagram,
  "1165906778?h=ca85d54254": vestidoLongoDiagram,
  "1165907172?h=5916a23185": vestidoLongoDiagram,
  "1165903186?h=bb7c0e0908": vestidoDecoteVDiagram,
  "1165905541?h=441d91f0bc": vestidoCiganinhaDiagram,
  "1165412197?h=0fa29c051a": vestidoLuxoDiagram,
  "1165896182?h=2ff4b53004": vestidoCleopatraDiagram,
  "CNe-elk8zm4": vestidoVirginiaDiagram,
};

// Custom thumbnails for videos
const customThumbnails: Record<string, string> = {
  // === Vimeo thumbnails (migrated from YouTube) ===
  "1165908032?h=4e8257a515": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "1165906778?h=ca85d54254": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "1165907172?h=5916a23185": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "1165903186?h=bb7c0e0908": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/fKqxGw4yvUY-HD_vwgf93.jpg",
  "1165905541?h=441d91f0bc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/Design_sem_nome_br7dpp.png",
  "1165412197?h=0fa29c051a": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/_EEt2dLuozA-SD_t33uvg.jpg",
  "1165896182?h=2ff4b53004": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/Ia19Yf-H08g-HD_qd4m2h.jpg",
  "1165415971?h=dd327a58fb": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286793/fKLX4pMjmck-SD_bnzvlf.jpg",
  "1165416602?h=239fa20e43": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286572/vrCyt1O4SjU-HD_nti0w1.jpg",
  "1165896871?h=f4895dbef0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/Square_lcapbv.jpg",
  "1165908266?h=61b6de8549": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/Sereia_nqhrmj.jpg",
  "1165898325?h=5af0c2457f": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/ana_clara_isprr9.jpg",
  "1165897115?h=2e6bdf5c09": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305845/vestido_camila_qd9qtd.jpg",
  "1165897327?h=bf84e16cb9": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/Conchas_sobfyn.jpg",
  "1165907603?h=bccb08fbbc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/darlene_lsmigi.jpg",
  "1165897423?h=6d46bec5f5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305962/Vestido_Croch%C3%AA_Saida_recu1m.jpg",
  "1165897740?h=21a8c932d8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/Evelyne_vgpz1r.jpg",
  "1165897922?h=83924a6988": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771306272/Vestido_Flavia_s2dixj.jpg",
  "1165417274?h=8e8af3b41e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/Longo_Noiva_c1p5t8.jpg",
  "hV4_YNI4fp0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771387377/DOURADO_QUADRADO_9_dlvqnp.png",
  "1165898928?h=ce0edc64ab": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/mo%C3%A7ambique_wvuoup.jpg",
  "1165899486?h=7759bd5d46": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771306403/Design_sem_nome_6_d73xyh.png",
  "1165898764?h=290f75b513": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/sousplate_u8qesy.jpg",
  "1165899713?h=063db9139d": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/tereza_fyt2v7.jpg",
  "1165908374?h=954ee77336": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771306716/iU1sYamfIVk-HD_ibcrxn.jpg",
  "1165899950?h=65fb9d0fc3": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/renata_h8xajx.jpg",
  "1165900227?h=ab8c1eb8e3": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/betania_xcfpnn.jpg",
  "1165900453?h=3a7d240268": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/saia_midi_rws7jx.png",
  "1165900701?h=fc8686d056": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Gardeen_bydvt2.jpg",
  "1165900912?h=25ab81c66e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/corset_de_croche_ngaefh.jpg",
  "1165901257?h=ba7889f004": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/corset_angel_g6z2jg.jpg",
  "1165901491?h=5bf59bc49e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/corset_em_v_kwwode.jpg",
  "1165901832?h=5c0b941af2": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Conjunto_svaxry.jpg",
  "1165902033?h=67a0e24c41": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/tardezinha_ogtoie.jpg",
  "1165896656?h=71c1d6054e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/conjunto_rosas_otscb3.jpg",
  "1165902686?h=192b4bb0cb": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/conjunto_brilho_hrkbp0.jpg",
  "1165902854?h=c106849f13": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Praiana_r8wcy2.jpg",
  "1165905050?h=ddfb626d58": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/camila_euvcxi.jpg",
  "lG2KfsR4pts": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/macac%C3%A3o_qidwbc.jpg",
  "1165905314?h=0abf93f051": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/cal%C3%A7a_thais_wmf6np.jpg",
  "1165908138?h=11ec544581": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/DxUeSn4p-Rg-HD_eodqdw.jpg",
  "1165908076?h=3b842fbf9d": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/S-Vp3QiN1Tk-HD_td6d0k.jpg",
  "1165908193?h=44ce060d5e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/IRnqSP9VCsg-HD_ixsndz.jpg",
  "CNe-elk8zm4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108167/XuuJvrgxk-8-HD_a5fzw6.jpg",

  // === VIMEO THUMBNAILS (updated videos) ===
  // Vestido Raquel
  "1165877185?h=ce49de91b5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771383895/VEERDE_VERTICAL_1_wzahng.png",
  // Vestido Virginia
  "1165822436?h=73db5fd949": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_VIRGINIA_y1pnbp.png",
  "1165822491?h=426a5c76b5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_VIRGINIA_y1pnbp.png",
  // Vestido Angel
  "1165822536?h=494836d768": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_ANGEL_bxkj7y.png",
  "1165822336?h=b2524c1a00": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_ANGEL_bxkj7y.png",
  "1165822633?h=9a932be1b8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_ANGEL_bxkj7y.png",
  // Saída Mel Maia
  "1165822238?h=798063ee5e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SAIDA_MEL_MAIA_o6g04n.png",
  "1165822696?h=58d1366209": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SAIDA_MEL_MAIA_o6g04n.png",
  // Vestido Maria
  "1165822301?h=88af25dec4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_MARIA_psu7sl.png",
  "1165822154?h=5ec6b1f8af": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_MARIA_psu7sl.png",
  "1165822389?h=7d4dceda8d": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_MARIA_psu7sl.png",
  // Vestido Juliana Paes
  "1165823703?h=f2563c95af": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  "1165823637?h=be2694c569": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  "1165823010?h=773cd6f91e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  "1165824039?h=b270eff1a3": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  // Calça Correntinha
  "1165823422?h=3bad21440c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/CAL%C3%87A_CORRENTINHA_gfgtky.png",
  // Calça Tela
  "1165823210?h=b5372b698b": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CAL%C3%87A_TELA_iqybjm.png",
  // Conjunto com Paetê Acrílico
  "1165823127?h=80846c06c2": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_PAETE_revqdb.png",
  // Cropped Ana Clara
  "1165823296?h=588db44c04": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CROPPED_ANNA_CLARA_x9vxf8.png",
  // Conjunto Gabi
  "1165823492?h=049b68c02a": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_GABI_xdph48.png",
  "1165823953?h=6133197ea0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_GABI_xdph48.png",
  "1165823551?h=e845f3f59b": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_GABI_xdph48.png",
  // Conjunto Franja
  "1165823586?h=95ae5df629": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/CONJUNTO_FRANJAS_j12exw.png",
  "1165823379?h=de1eeffff5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/CONJUNTO_FRANJAS_j12exw.png",
  // Saia Laura
  "1165823777?h=2148619f8b": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/SAIA_LAURA_ijd79k.png",
  // Vestido Patricia
  "1165823890?h=8a3a44f1d3": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_PATRICIA_frmvo7.png",
  "1165823819?h=d5bbc1ab0f": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_PATRICIA_frmvo7.png",
  // Vestido Sophia
  "1165826517?h=288eec92f1": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_SOPHIA_wteqz7.png",
  // Vestido Moana
  "1165826035?h=8dbfaef2b0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_MOANA_lv1a3z.png",
  // Vestido Vanessa
  "1165827065?h=0540e2af34": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_VANESSA_hwbdc8.png",
  "1165826296?h=8c5f4f7cfb": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_VANESSA_hwbdc8.png",
  "1165826387?h=9cf52087de": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_VANESSA_hwbdc8.png",
  // Vestido Vanda
  "1165826807?h=56f86f1de4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_VANDA_xgcc3d.png",
  // Biquini Eva
  "1165826908?h=cf3b0678ab": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/BIQUINI_EVA_crun7w.png",
  // Saia Amanda
  "1165826996?h=639389fcf0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/SAIA_AMANDA_xo6sar.png",
  // Vestido Bel
  "1165826717?h=fd78660abf": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_BEL_ljtxn1.png",
  "1165826152?h=d563f325dc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_BEL_ljtxn1.png",
  // Cropped Duda
  "1165825953?h=b67785daa5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CROPPED_DUDA_thz0po.png",
  // Vestido Marina
  "1165826240?h=bb6309f319": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_MARINA_qltofi.png",
  "1165825869?h=8858cf55a6": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_MARINA_qltofi.png",
  // Vestido Ana Paula
  "1165825235?h=e65562ca75": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_ANA_PAULA_cqjakj.png",
  "1165825126?h=78b247f600": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_ANA_PAULA_cqjakj.png",
  "1165825817?h=a8a15760a4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_ANA_PAULA_cqjakj.png",
  // Conjunto Lisi
  "1165825489?h=4953414a7c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/CONJUNTO_LISI_h1slto.png",
  "1165825673?h=fb8f804677": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/CONJUNTO_LISI_h1slto.png",
  // Saia Nina
  "1165825423?h=8cfc5ddc23": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/SAIA_NINA_nughgu.png",
  // Vestido Ana
  "1165825582?h=f833fa35d1": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_ANA_nfzd2w.png",
  // Vestido Yara
  "1165825327?h=6fcce5e502": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_YARA_dqirvc.png",
  "1165825757?h=00739caa67": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_YARA_dqirvc.png",
  // Conjunto Leticia
  "1165867234?h=6e2eed84e2": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/CONJUNTO_LETICIA_rtxkh0.png",
  // Conjunto Lore
  "1165827131?h=c55fa2bddb": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771387377/DOURADO_QUADRADO_9_dlvqnp.png",
  "1165827332?h=75278547ee": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771387377/DOURADO_QUADRADO_9_dlvqnp.png",
  "1165824975?h=29ac896d60": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771387377/DOURADO_QUADRADO_9_dlvqnp.png",
  // Vestido Nala
  "1165828828?h=a4c932ccd4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_NALA_rorfhm.png",
  "1165829077?h=2e1fffbb63": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_NALA_rorfhm.png",
  // Macacão Grassi
  "1165828975?h=b2f003a62f": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381436/MACAC%C3%83O_GRASSI_v5fawd.png",
  "1165829345?h=67f801752d": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381436/MACAC%C3%83O_GRASSI_v5fawd.png",
  // Suéter Sofia
  "1165829840?h=bda1e8e5be": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SU%C3%89TER_SOFIA_zrjpji.png",
  "1165828330?h=b9b9868fd2": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SU%C3%89TER_SOFIA_zrjpji.png",
  // Vestido Larissa
  "1165829701?h=c3dde6b38a": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_LARISSA_dn0bln.png",
  "1165829124?h=f7f7193ac1": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_LARISSA_dn0bln.png",
  "1165829571?h=8d15bdff7a": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_LARISSA_dn0bln.png",
  // Cropped Lola
  "1165828668?h=95dd4603c4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CROPPED_LOLA_hht4ad.png",
  // Conjunto Cali
  "1165828774?h=0add065419": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
  "1165828605?h=58d11062d4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
  "1165828438?h=456ae1cdb5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
  "1165828229?h=4acb08a378": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
  // Vestido Patricia Poeta
  "1166455223": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771531574/DOURADO_VERTICAL_12_tsvwke.png",
  "1166455407": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771531574/DOURADO_VERTICAL_12_tsvwke.png",
  "1166455304": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771531574/DOURADO_VERTICAL_12_tsvwke.png",
};

const getVideoThumbnail = (videoId: string, platform?: string) => {
  if (customThumbnails[videoId]) return customThumbnails[videoId];
  if (platform === "vimeo") return `https://vumbnail.com/${videoId.split('?')[0]}.jpg`;
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const VestidosCroche = () => {
  const videos = [
    // ===== PÁGINA 1 (1-20) =====
    { id: 1, title: "Vestido Longo de Crochê", videoId: "1165908032?h=4e8257a515", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 2, title: "Vestido Longo de Crochê 2", videoId: "1165906778?h=ca85d54254", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 3, title: "Vestido Longo de Crochê 3", videoId: "1165907172?h=5916a23185", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 4, title: "Vestido Decote V", videoId: "1165903186?h=bb7c0e0908", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 5, title: "Vestido Raquel", videoId: "1165877185?h=ce49de91b5", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 6, title: "Vestido Ciganinha", videoId: "1165905541?h=441d91f0bc", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 7, title: "Vestido Luxo", videoId: "1165412197?h=0fa29c051a", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 8, title: "Vestido Cleópatra", videoId: "1165896182?h=2ff4b53004", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 9, title: "Conjunto Rosas", videoId: "1165896656?h=71c1d6054e", project: "Conjunto Rosas", part: null, platform: "vimeo" as const },
    { id: 10, title: "Top Estrela Brasil", videoId: "1165908076?h=3b842fbf9d", project: "Top Estrela Brasil", part: null, platform: "vimeo" as const },
    // Virginia logo abaixo do Top Estrela Brasil
    { id: 11, title: "Vestido Virginia - Parte 1", videoId: "1165822436?h=73db5fd949", project: "Vestido Virginia", part: 1, platform: "vimeo" as const },
    { id: 12, title: "Vestido Virginia - Parte 2", videoId: "1165822491?h=426a5c76b5", project: "Vestido Virginia", part: 2, platform: "vimeo" as const },
    // Angel logo abaixo da Virginia
    { id: 13, title: "Vestido Angel - Parte 1", videoId: "1165822536?h=494836d768", project: "Vestido Angel", part: 1, platform: "vimeo" as const },
    { id: 14, title: "Vestido Angel - Parte 2", videoId: "1165822336?h=b2524c1a00", project: "Vestido Angel", part: 2, platform: "vimeo" as const },
    { id: 15, title: "Vestido Angel - Parte 3", videoId: "1165822633?h=9a932be1b8", project: "Vestido Angel", part: 3, platform: "vimeo" as const },
    // Saída Mel Maia logo abaixo do Angel
    { id: 16, title: "Saída Mel Maia - Parte 1", videoId: "1165822238?h=798063ee5e", project: "Saída Mel Maia", part: 1, platform: "vimeo" as const },
    { id: 17, title: "Saída Mel Maia - Parte 2", videoId: "1165822696?h=58d1366209", project: "Saída Mel Maia", part: 2, platform: "vimeo" as const },
    // Conjunto Franja na página 1
    { id: 18, title: "Conjunto Franja - Parte 1", videoId: "1165823586?h=95ae5df629", project: "Conjunto Franja", part: 1, platform: "vimeo" as const },
    { id: 19, title: "Conjunto Franja - Parte 2", videoId: "1165823379?h=de1eeffff5", project: "Conjunto Franja", part: 2, platform: "vimeo" as const },
    { id: 20, title: "Conjunto Square", videoId: "1165896871?h=f4895dbef0", project: "Conjunto Square", part: null, platform: "vimeo" as const },
    { id: 21, title: "Vestido Sereia", videoId: "1165908266?h=61b6de8549", project: "Vestido Sereia", part: null, platform: "vimeo" as const },

    // ===== PÁGINA 2+ (21+): Ordem específica no início, depois embaralhados =====
    // Vestido Maria no começo da página 2
    { id: 21, title: "Vestido Maria - Parte 1", videoId: "1165822301?h=88af25dec4", project: "Vestido Maria", part: 1, platform: "vimeo" as const },
    { id: 22, title: "Vestido Maria - Parte 2", videoId: "1165822154?h=5ec6b1f8af", project: "Vestido Maria", part: 2, platform: "vimeo" as const },
    { id: 23, title: "Vestido Maria - Parte 3", videoId: "1165822389?h=7d4dceda8d", project: "Vestido Maria", part: 3, platform: "vimeo" as const },
    // Cropped Duda logo abaixo
    { id: 24, title: "Cropped Duda", videoId: "1165825953?h=b67785daa5", project: "Cropped Duda", part: null, platform: "vimeo" as const },
    // Vestido Nala logo abaixo
    { id: 25, title: "Vestido Nala - Parte 1", videoId: "1165828828?h=a4c932ccd4", project: "Vestido Nala", part: 1, platform: "vimeo" as const },
    { id: 26, title: "Vestido Nala - Parte 2", videoId: "1165829077?h=2e1fffbb63", project: "Vestido Nala", part: 2, platform: "vimeo" as const },
    // Cropped Lola logo abaixo
    { id: 27, title: "Cropped Lola", videoId: "1165828668?h=95dd4603c4", project: "Cropped Lola", part: null, platform: "vimeo" as const },
    // Vestido Ana Paula logo abaixo
    { id: 28, title: "Vestido Ana Paula - Parte 1", videoId: "1165825235?h=e65562ca75", project: "Vestido Ana Paula", part: 1, platform: "vimeo" as const },
    { id: 29, title: "Vestido Ana Paula - Parte 2", videoId: "1165825126?h=78b247f600", project: "Vestido Ana Paula", part: 2, platform: "vimeo" as const },
    { id: 30, title: "Vestido Ana Paula - Parte 3", videoId: "1165825817?h=a8a15760a4", project: "Vestido Ana Paula", part: 3, platform: "vimeo" as const },

    // ===== Restante dos Vimeo (embaralhados) =====
    { id: 31, title: "Vestido Sophia", videoId: "1165826517?h=288eec92f1", project: "Vestido Sophia", part: null, platform: "vimeo" as const },
    { id: 32, title: "Vestido Juliana Paes - Parte 1", videoId: "1165823703?h=f2563c95af", project: "Vestido Juliana Paes", part: 1, platform: "vimeo" as const },
    { id: 33, title: "Vestido Juliana Paes - Parte 2", videoId: "1165823637?h=be2694c569", project: "Vestido Juliana Paes", part: 2, platform: "vimeo" as const },
    { id: 34, title: "Vestido Juliana Paes - Parte 3", videoId: "1165823010?h=773cd6f91e", project: "Vestido Juliana Paes", part: 3, platform: "vimeo" as const },
    { id: 35, title: "Vestido Juliana Paes - Parte 4", videoId: "1165824039?h=b270eff1a3", project: "Vestido Juliana Paes", part: 4, platform: "vimeo" as const },
    { id: 36, title: "Conjunto Cali - Parte 1", videoId: "1165828774?h=0add065419", project: "Conjunto Cali", part: 1, platform: "vimeo" as const },
    { id: 37, title: "Conjunto Cali - Parte 2", videoId: "1165828605?h=58d11062d4", project: "Conjunto Cali", part: 2, platform: "vimeo" as const },
    { id: 38, title: "Conjunto Cali - Parte 3", videoId: "1165828438?h=456ae1cdb5", project: "Conjunto Cali", part: 3, platform: "vimeo" as const },
    { id: 39, title: "Conjunto Cali - Parte 4", videoId: "1165828229?h=4acb08a378", project: "Conjunto Cali", part: 4, platform: "vimeo" as const },
    { id: 40, title: "Vestido Moana", videoId: "1165826035?h=8dbfaef2b0", project: "Vestido Moana", part: null, platform: "vimeo" as const },
    { id: 41, title: "Vestido Larissa - Parte 1", videoId: "1165829701?h=c3dde6b38a", project: "Vestido Larissa", part: 1, platform: "vimeo" as const },
    { id: 42, title: "Vestido Larissa - Parte 2", videoId: "1165829124?h=f7f7193ac1", project: "Vestido Larissa", part: 2, platform: "vimeo" as const },
    { id: 43, title: "Vestido Larissa - Parte 3", videoId: "1165829571?h=8d15bdff7a", project: "Vestido Larissa", part: 3, platform: "vimeo" as const },
    { id: 44, title: "Calça Correntinha", videoId: "1165823422?h=3bad21440c", project: "Calça Correntinha", part: null, platform: "vimeo" as const },
    { id: 45, title: "Vestido Vanessa - Parte 1", videoId: "1165827065?h=0540e2af34", project: "Vestido Vanessa", part: 1, platform: "vimeo" as const },
    { id: 46, title: "Vestido Vanessa - Parte 2", videoId: "1165826296?h=8c5f4f7cfb", project: "Vestido Vanessa", part: 2, platform: "vimeo" as const },
    { id: 47, title: "Vestido Vanessa - Parte 3", videoId: "1165826387?h=9cf52087de", project: "Vestido Vanessa", part: 3, platform: "vimeo" as const },
    { id: 48, title: "Conjunto Lore - Parte 1", videoId: "1165827131?h=c55fa2bddb", project: "Conjunto Lore", part: 1, platform: "vimeo" as const },
    { id: 49, title: "Conjunto Lore - Parte 2", videoId: "1165827332?h=75278547ee", project: "Conjunto Lore", part: 2, platform: "vimeo" as const },
    { id: 50, title: "Conjunto Lore - Parte 3", videoId: "1165824975?h=29ac896d60", project: "Conjunto Lore", part: 3, platform: "vimeo" as const },
    { id: 51, title: "Saia Laura", videoId: "1165823777?h=2148619f8b", project: "Saia Laura", part: null, platform: "vimeo" as const },
    { id: 52, title: "Vestido Bel - Parte 1", videoId: "1165826717?h=fd78660abf", project: "Vestido Bel", part: 1, platform: "vimeo" as const },
    { id: 53, title: "Vestido Bel - Parte 2", videoId: "1165826152?h=d563f325dc", project: "Vestido Bel", part: 2, platform: "vimeo" as const },
    { id: 54, title: "Conjunto Gabi - Parte 1", videoId: "1165823492?h=049b68c02a", project: "Conjunto Gabi", part: 1, platform: "vimeo" as const },
    { id: 55, title: "Conjunto Gabi - Parte 2", videoId: "1165823953?h=6133197ea0", project: "Conjunto Gabi", part: 2, platform: "vimeo" as const },
    { id: 56, title: "Conjunto Gabi - Dica Extra", videoId: "1165823551?h=e845f3f59b", project: "Conjunto Gabi", part: 3, platform: "vimeo" as const },
    { id: 57, title: "Macacão Grassi - Parte 1", videoId: "1165828975?h=b2f003a62f", project: "Macacão Grassi", part: 1, platform: "vimeo" as const },
    { id: 58, title: "Macacão Grassi - Parte 2", videoId: "1165829345?h=67f801752d", project: "Macacão Grassi", part: 2, platform: "vimeo" as const },
    { id: 59, title: "Calça Tela", videoId: "1165823210?h=b5372b698b", project: "Calça Tela", part: null, platform: "vimeo" as const },
    { id: 60, title: "Vestido Yara - Parte 1", videoId: "1165825327?h=6fcce5e502", project: "Vestido Yara", part: 1, platform: "vimeo" as const },
    { id: 61, title: "Vestido Yara - Parte 2", videoId: "1165825757?h=00739caa67", project: "Vestido Yara", part: 2, platform: "vimeo" as const },
    { id: 62, title: "Conjunto com Paetê Acrílico", videoId: "1165823127?h=80846c06c2", project: "Conjunto com Paetê Acrílico", part: null, platform: "vimeo" as const },
    { id: 63, title: "Cropped Ana Clara", videoId: "1165823296?h=588db44c04", project: "Cropped Ana Clara", part: null, platform: "vimeo" as const },
    { id: 64, title: "Vestido Vanda", videoId: "1165826807?h=56f86f1de4", project: "Vestido Vanda", part: null, platform: "vimeo" as const },
    { id: 65, title: "Suéter Sofia - Parte 1", videoId: "1165829840?h=bda1e8e5be", project: "Suéter Sofia", part: 1, platform: "vimeo" as const },
    { id: 66, title: "Suéter Sofia - Parte 2", videoId: "1165828330?h=b9b9868fd2", project: "Suéter Sofia", part: 2, platform: "vimeo" as const },
    { id: 67, title: "Vestido Patricia - Parte 1", videoId: "1165823890?h=8a3a44f1d3", project: "Vestido Patricia", part: 1, platform: "vimeo" as const },
    { id: 68, title: "Vestido Patricia - Parte 2", videoId: "1165823819?h=d5bbc1ab0f", project: "Vestido Patricia", part: 2, platform: "vimeo" as const },
    { id: 69, title: "Conjunto Lisi - Parte 1", videoId: "1165825489?h=4953414a7c", project: "Conjunto Lisi", part: 1, platform: "vimeo" as const },
    { id: 70, title: "Conjunto Lisi - Parte 2", videoId: "1165825673?h=fb8f804677", project: "Conjunto Lisi", part: 2, platform: "vimeo" as const },
    { id: 71, title: "Biquíni Eva", videoId: "1165826908?h=cf3b0678ab", project: "Biquíni Eva", part: null, platform: "vimeo" as const },
    { id: 72, title: "Saia Amanda", videoId: "1165826996?h=639389fcf0", project: "Saia Amanda", part: null, platform: "vimeo" as const },
    { id: 73, title: "Saia Nina", videoId: "1165825423?h=8cfc5ddc23", project: "Saia Nina", part: null, platform: "vimeo" as const },
    { id: 74, title: "Vestido Ana", videoId: "1165825582?h=f833fa35d1", project: "Vestido Ana", part: null, platform: "vimeo" as const },
    { id: 75, title: "Vestido Marina - Parte 1", videoId: "1165826240?h=bb6309f319", project: "Vestido Marina", part: 1, platform: "vimeo" as const },
    { id: 76, title: "Vestido Marina - Parte 2", videoId: "1165825869?h=8858cf55a6", project: "Vestido Marina", part: 2, platform: "vimeo" as const },
    { id: 77, title: "Conjunto Letícia", videoId: "1165867234?h=6e2eed84e2", project: "Conjunto Letícia", part: null, platform: "vimeo" as const },

    // ===== YouTube empurrados da página 1 (com thumbnails) =====
    { id: 78, title: "Vestido Ana Clara", videoId: "1165898325?h=5af0c2457f", project: "Vestido Ana Clara", part: null, platform: "vimeo" as const },
    { id: 79, title: "Vestido Camila", videoId: "1165897115?h=2e6bdf5c09", project: "Vestido Camila", part: null, platform: "vimeo" as const },
    { id: 80, title: "Vestido Concha", videoId: "1165897327?h=bf84e16cb9", project: "Vestido Concha", part: null, platform: "vimeo" as const },
    { id: 81, title: "Vestido Darlene", videoId: "1165907603?h=bccb08fbbc", project: "Vestido Darlene", part: null, platform: "vimeo" as const },
    { id: 82, title: "Vestido Crochê Saida", videoId: "1165897423?h=6d46bec5f5", project: "Vestido Crochê Saida", part: null, platform: "vimeo" as const },
    { id: 83, title: "Vestido Evelyne", videoId: "1165897740?h=21a8c932d8", project: "Vestido Evelyne", part: null, platform: "vimeo" as const },
    { id: 84, title: "Vestido Flavia", videoId: "1165897922?h=83924a6988", project: "Vestido Flavia", part: null, platform: "vimeo" as const },
    { id: 85, title: "Vestido Noiva Longo", videoId: "1165417274?h=8e8af3b41e", project: "Vestido Noiva Longo", part: null, platform: "vimeo" as const },

    // ===== VÍDEOS MIGRADOS PARA VIMEO =====
    // Vestido Lore removido
    { id: 87, title: "Vestido Moçambique", videoId: "1165898928?h=ce0edc64ab", project: "Vestido Moçambique", part: null, platform: "vimeo" as const },
    { id: 88, title: "Vestido Raira", videoId: "1165899486?h=7759bd5d46", project: "Vestido Raira", part: null, platform: "vimeo" as const },
    { id: 89, title: "Sousplato Girafa", videoId: "1165898764?h=290f75b513", project: "Sousplato Girafa", part: null, platform: "vimeo" as const },
    { id: 90, title: "Saida Tereza", videoId: "1165899713?h=063db9139d", project: "Saida Tereza", part: null, platform: "vimeo" as const },
    { id: 91, title: "Saida Shirley", videoId: "1165908374?h=954ee77336", project: "Saida Shirley", part: null, platform: "vimeo" as const },
    { id: 92, title: "Saida Renata", videoId: "1165899950?h=65fb9d0fc3", project: "Saida Renata", part: null, platform: "vimeo" as const },
    { id: 93, title: "Saida Betania", videoId: "1165900227?h=ab8c1eb8e3", project: "Saida Betania", part: null, platform: "vimeo" as const },
    { id: 94, title: "Saida Midi", videoId: "1165900453?h=3a7d240268", project: "Saida Midi", part: null, platform: "vimeo" as const },
    { id: 95, title: "Cropped Garden", videoId: "1165900701?h=fc8686d056", project: "Cropped Garden", part: null, platform: "vimeo" as const },
    { id: 96, title: "Corset de Crochê", videoId: "1165900912?h=25ab81c66e", project: "Corset de Crochê", part: null, platform: "vimeo" as const },
    { id: 97, title: "Corset Angel", videoId: "1165901257?h=ba7889f004", project: "Corset Angel", part: null, platform: "vimeo" as const },
    { id: 98, title: "Corset em V", videoId: "1165901491?h=5bf59bc49e", project: "Corset em V", part: null, platform: "vimeo" as const },
    { id: 99, title: "Conjunto Tereza", videoId: "1165901832?h=5c0b941af2", project: "Conjunto Tereza", part: null, platform: "vimeo" as const },
    { id: 100, title: "Conjunto Tardezinha", videoId: "1165902033?h=67a0e24c41", project: "Conjunto Tardezinha", part: null, platform: "vimeo" as const },
    { id: 101, title: "Biquini Rendado", videoId: "1165415971?h=dd327a58fb", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 102, title: "Conjunto de Crochê Brilho", videoId: "1165902686?h=192b4bb0cb", project: "Conjunto Crochê Brilho", part: null, platform: "vimeo" as const },
    { id: 103, title: "Conjunto Praiana", videoId: "1165902854?h=c106849f13", project: "Conjunto Praiana", part: null, platform: "vimeo" as const },
    { id: 104, title: "Conjunto Camila", videoId: "1165905050?h=ddfb626d58", project: "Conjunto Camila", part: null, platform: "vimeo" as const },
    
    { id: 106, title: "Calça Thais", videoId: "1165905314?h=0abf93f051", project: "Calça Thais", part: null, platform: "vimeo" as const },
    { id: 107, title: "Saida Brasil", videoId: "1165908138?h=11ec544581", project: "Saida Brasil", part: null, platform: "vimeo" as const },
    { id: 108, title: "Biquini Tomara que Caia", videoId: "1165416602?h=239fa20e43", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 109, title: "Top Brasil", videoId: "1165908193?h=44ce060d5e", project: "Top Brasil", part: null, platform: "vimeo" as const },

    // ===== 110+: VÍDEOS ANTIGOS COM PIX (YouTube) =====
    
    // Vestido Patricia Poeta (3 partes)
    { id: 111, title: "Vestido Patricia Poeta - Parte 1", videoId: "1166455223", project: "Vestido Patricia Poeta", part: 1, platform: "vimeo" as const },
    { id: 112, title: "Vestido Patricia Poeta - Parte 2", videoId: "1166455407", project: "Vestido Patricia Poeta", part: 2, platform: "vimeo" as const },
    { id: 113, title: "Vestido Patricia Poeta - Parte 3", videoId: "1166455304", project: "Vestido Patricia Poeta", part: 3, platform: "vimeo" as const },
    
    // Conjunto Zelly (3 partes)
    { id: 114, title: "Conjunto Zelly - Parte 1", videoId: "jxe4-eZwGwQ", project: "Conjunto Zelly", part: 1, platform: "youtube" as const },
    { id: 115, title: "Conjunto Zelly - Parte 2", videoId: "Z6viihH1OHw", project: "Conjunto Zelly", part: 2, platform: "youtube" as const },
    { id: 116, title: "Conjunto Zelly - Parte 3", videoId: "rXHydF8r2yU", project: "Conjunto Zelly", part: 3, platform: "youtube" as const },
    
    // Cropped Livia
    { id: 117, title: "Cropped Livia", videoId: "QfJUjcU7ZTU", project: "Cropped Livia", part: null, platform: "youtube" as const },
    
    // Vestido Alice (2 partes)
    { id: 118, title: "Vestido Alice - Parte 1", videoId: "tXYVzevsCEA", project: "Vestido Alice", part: 1, platform: "youtube" as const },
    { id: 119, title: "Vestido Alice - Parte 2", videoId: "UEZOTs4Bjw0", project: "Vestido Alice", part: 2, platform: "youtube" as const },
    
    // Conjunto Renata (2 partes)
    { id: 120, title: "Conjunto Renata - Parte 1", videoId: "mpwaRW5yMXc", project: "Conjunto Renata", part: 1, platform: "youtube" as const },
    { id: 121, title: "Conjunto Renata - Parte 2", videoId: "-Iu0FaXkuAo", project: "Conjunto Renata", part: 2, platform: "youtube" as const },
    
    // Vestido Ana II
    { id: 122, title: "Vestido Ana II", videoId: "EBHjI1mVKxA", project: "Vestido Ana II", part: null, platform: "youtube" as const },
    
    // Vestido Lari (3 partes)
    { id: 123, title: "Vestido Lari - Parte 1", videoId: "tsWy6DxF14M", project: "Vestido Lari", part: 1, platform: "youtube" as const },
    { id: 124, title: "Vestido Lari - Parte 2", videoId: "Thn0KVRjcok", project: "Vestido Lari", part: 2, platform: "youtube" as const },
    { id: 125, title: "Vestido Lari - Parte 3", videoId: "piaFF1nlxso", project: "Vestido Lari", part: 3, platform: "youtube" as const },
    
    // Vestido Nay (2 partes)
    { id: 126, title: "Vestido Nay - Parte 1", videoId: "hWpuYeic9Cw", project: "Vestido Nay", part: 1, platform: "youtube" as const },
    { id: 127, title: "Vestido Nay - Parte 2", videoId: "0lqNycXsXWE", project: "Vestido Nay", part: 2, platform: "youtube" as const },
    
    // Vestido Yara II
    { id: 128, title: "Vestido Yara II", videoId: "ORapj3rePNs", project: "Vestido Yara II", part: null, platform: "youtube" as const },
    
    // Conjunto Íris (2 partes)
    { id: 129, title: "Conjunto Íris - Parte 1", videoId: "YtLjwU-Db2w", project: "Conjunto Íris", part: 1, platform: "youtube" as const },
    { id: 130, title: "Conjunto Íris - Parte 2", videoId: "7K0_9wxdMvo", project: "Conjunto Íris", part: 2, platform: "youtube" as const },
    
    // Conjunto Salles (3 partes)
    { id: 131, title: "Conjunto Salles - Parte 1", videoId: "cUqJUYwBa5Q", project: "Conjunto Salles", part: 1, platform: "youtube" as const },
    { id: 132, title: "Conjunto Salles - Parte 2", videoId: "Ty-OoJH-C3M", project: "Conjunto Salles", part: 2, platform: "youtube" as const },
    { id: 133, title: "Conjunto Salles - Parte 3", videoId: "GzBaR84iQsE", project: "Conjunto Salles", part: 3, platform: "youtube" as const },
    
    // Conjunto Scheila (2 partes)
    { id: 134, title: "Conjunto Scheila - Parte 1", videoId: "xv2dowFOhO0", project: "Conjunto Scheila", part: 1, platform: "youtube" as const },
    { id: 135, title: "Conjunto Scheila - Parte 2", videoId: "RAR1S3ES-kA", project: "Conjunto Scheila", part: 2, platform: "youtube" as const },
    
    // Cropped Angel
    { id: 136, title: "Cropped Angel", videoId: "t4AI9uTrVts", project: "Cropped Angel", part: null, platform: "youtube" as const },
    
    // Cropped Anitta
    { id: 137, title: "Cropped Anitta", videoId: "40gsEHSnbJY", project: "Cropped Anitta", part: null, platform: "youtube" as const },
    
    // Cropped Maré
    { id: 138, title: "Cropped Maré", videoId: "3XGhrDxunQ0", project: "Cropped Maré", part: null, platform: "youtube" as const },
    
    // Vestido Estrella (2 partes)
    { id: 139, title: "Vestido Estrella - Parte 1", videoId: "WljMCbcNS5E", project: "Vestido Estrella", part: 1, platform: "youtube" as const },
    { id: 140, title: "Vestido Estrella - Parte 2", videoId: "SbWlKS41gkw", project: "Vestido Estrella", part: 2, platform: "youtube" as const },
    
    // Vestido Lore (4 partes)
    { id: 141, title: "Vestido Lore - Parte 1", videoId: "t53TD8lwI14", project: "Vestido Lore", part: 1, platform: "youtube" as const },
    { id: 142, title: "Vestido Lore - Parte 2", videoId: "MA7_cOiRg7E", project: "Vestido Lore", part: 2, platform: "youtube" as const },
    { id: 143, title: "Vestido Lore - Parte 3", videoId: "MJE5_uAo26k", project: "Vestido Lore", part: 3, platform: "youtube" as const },
    { id: 144, title: "Vestido Lore - Parte 4", videoId: "NfjrvIXu5uE", project: "Vestido Lore", part: 4, platform: "youtube" as const },
    
    // Vestido Gaia (2 partes)
    { id: 145, title: "Vestido Gaia - Parte 1", videoId: "NvNkvz1Wp_I", project: "Vestido Gaia", part: 1, platform: "youtube" as const },
    { id: 146, title: "Vestido Gaia - Parte 2", videoId: "hcYeXZs023I", project: "Vestido Gaia", part: 2, platform: "youtube" as const },
    
    // Vestido Yasmin (3 partes)
    { id: 147, title: "Vestido Yasmin - Parte 1", videoId: "tHbOidDsGgw", project: "Vestido Yasmin", part: 1, platform: "youtube" as const },
    { id: 148, title: "Vestido Yasmin - Parte 2", videoId: "Coxx_IZvUIY", project: "Vestido Yasmin", part: 2, platform: "youtube" as const },
    { id: 149, title: "Vestido Yasmin - Parte 3", videoId: "0qdMe4MV9yM", project: "Vestido Yasmin", part: 3, platform: "youtube" as const },
    
    // Conjunto Suri (5 partes)
    { id: 150, title: "Conjunto Suri - Parte 1", videoId: "jdz_X69RGlo", project: "Conjunto Suri", part: 1, platform: "youtube" as const },
    { id: 151, title: "Conjunto Suri - Parte 2", videoId: "3CxncyzC2pc", project: "Conjunto Suri", part: 2, platform: "youtube" as const },
    { id: 152, title: "Conjunto Suri - Parte 3", videoId: "8LT66fWB6LE", project: "Conjunto Suri", part: 3, platform: "youtube" as const },
    { id: 153, title: "Conjunto Suri - Parte 4", videoId: "2l8m8xx_Xd4", project: "Conjunto Suri", part: 4, platform: "youtube" as const },
    { id: 154, title: "Conjunto Suri - Parte 5", videoId: "I0MAot5zZYo", project: "Conjunto Suri", part: 5, platform: "youtube" as const },
    
    // Vestido Lorena (5 partes)
    { id: 155, title: "Vestido Lorena - Parte 1", videoId: "wYK9dr2ej8s", project: "Vestido Lorena", part: 1, platform: "youtube" as const },
    { id: 156, title: "Vestido Lorena - Parte 2", videoId: "uTQkwhhv-UQ", project: "Vestido Lorena", part: 2, platform: "youtube" as const },
    { id: 157, title: "Vestido Lorena - Parte 3", videoId: "imeIgdGRsyw", project: "Vestido Lorena", part: 3, platform: "youtube" as const },
    { id: 158, title: "Vestido Lorena - Parte 4", videoId: "gRsGLrTpxIM", project: "Vestido Lorena", part: 4, platform: "youtube" as const },
    { id: 159, title: "Vestido Lorena - Parte 5", videoId: "aGLzzwJkNeQ", project: "Vestido Lorena", part: 5, platform: "youtube" as const },
    
    // Bolsa de Crochê
    { id: 160, title: "Bolsa de Crochê", videoId: "VGk7GMxhrME", project: "Bolsa de Crochê", part: null, platform: "youtube" as const },
    
    // Saída Rayssa (2 partes)
    { id: 161, title: "Saída Rayssa - Parte 1", videoId: "vu2MeYApu_A", project: "Saída Rayssa", part: 1, platform: "youtube" as const },
    { id: 162, title: "Saída Rayssa - Parte 2", videoId: "4UTIaRLbZ74", project: "Saída Rayssa", part: 2, platform: "youtube" as const },
    
    // Vestido Sol (3 partes)
    { id: 163, title: "Vestido Sol - Parte 1", videoId: "DIOCJ-HG5g4", project: "Vestido Sol", part: 1, platform: "youtube" as const },
    { id: 164, title: "Vestido Sol - Parte 2", videoId: "leIirPP43fA", project: "Vestido Sol", part: 2, platform: "youtube" as const },
    { id: 165, title: "Vestido Sol - Parte 3", videoId: "C0wJap6TzOo", project: "Vestido Sol", part: 3, platform: "youtube" as const },
    
    // Vestido Abacaxi (2 partes)
    { id: 166, title: "Vestido Abacaxi - Parte 1", videoId: "sBGHr6aSevQ", project: "Vestido Abacaxi", part: 1, platform: "youtube" as const },
    { id: 167, title: "Vestido Abacaxi - Parte 2", videoId: "s8e8lbmqYSY", project: "Vestido Abacaxi", part: 2, platform: "youtube" as const },
    
    // Vestido Bella (3 partes)
    { id: 168, title: "Vestido Bella - Parte 1", videoId: "CA2UaeVF4Kg", project: "Vestido Bella", part: 1, platform: "youtube" as const },
    { id: 169, title: "Vestido Bella - Parte 2", videoId: "DVqqw8Dcxxg", project: "Vestido Bella", part: 2, platform: "youtube" as const },
    { id: 170, title: "Vestido Bella - Parte 3", videoId: "0ci6lDnmWK4", project: "Vestido Bella", part: 3, platform: "youtube" as const },
    
    // Vestido e Cropped Julia (2 partes)
    { id: 171, title: "Vestido e Cropped Julia - Parte 1", videoId: "29b_BL-L0dw", project: "Vestido e Cropped Julia", part: 1, platform: "youtube" as const },
    { id: 172, title: "Vestido e Cropped Julia - Parte 2", videoId: "S6ekc5BgMqM", project: "Vestido e Cropped Julia", part: 2, platform: "youtube" as const },
    
    // Vestido Brunnet (3 partes)
    { id: 173, title: "Vestido Brunnet - Parte 1", videoId: "FN_OFnIJK_0", project: "Vestido Brunnet", part: 1, platform: "youtube" as const },
    { id: 174, title: "Vestido Brunnet - Parte 2", videoId: "Xc55DMK6q-s", project: "Vestido Brunnet", part: 2, platform: "youtube" as const },
    { id: 175, title: "Vestido Brunnet - Parte 3", videoId: "t9uTNN1DzvU", project: "Vestido Brunnet", part: 3, platform: "youtube" as const },
    
    // Conjunto Tamiris (2 partes)
    { id: 176, title: "Conjunto Tamiris - Parte 1", videoId: "wRGwVev34bk", project: "Conjunto Tamiris", part: 1, platform: "youtube" as const },
    { id: 177, title: "Conjunto Tamiris - Parte 2", videoId: "AjoW1enGcGk", project: "Conjunto Tamiris", part: 2, platform: "youtube" as const },
    
    // Vestido Anitta
    { id: 178, title: "Vestido Anitta", videoId: "vjdcTjhCOHI", project: "Vestido Anitta", part: null, platform: "youtube" as const },
    
    // Cropped Amari
    { id: 179, title: "Cropped Amari", videoId: "8utWdn_DFgg", project: "Cropped Amari", part: null, platform: "youtube" as const },
    
    // Cropped Tati
    { id: 180, title: "Cropped Tati", videoId: "oUrvkDdDdiU", project: "Cropped Tati", part: null, platform: "youtube" as const },
    
    // Vestido Dubai
    { id: 181, title: "Vestido Dubai - Aula Parcelada", videoId: "i-55PjpIhtw", project: "Vestido Dubai", part: null, platform: "youtube" as const },
    
    // Vestido Laís (3 partes)
    { id: 182, title: "Vestido Laís - Parte 1", videoId: "Ip8HhIZ-XTw", project: "Vestido Laís", part: 1, platform: "youtube" as const },
    { id: 183, title: "Vestido Laís - Parte 2", videoId: "XO4uMvRd2wg", project: "Vestido Laís", part: 2, platform: "youtube" as const },
    { id: 184, title: "Vestido Laís - Parte 3", videoId: "u4MrCZqnjLQ", project: "Vestido Laís", part: 3, platform: "youtube" as const },
    
    // Vestido Léa (2 partes)
    { id: 185, title: "Vestido Léa - Parte 1", videoId: "anqMDNT27Z4", project: "Vestido Léa", part: 1, platform: "youtube" as const },
    { id: 186, title: "Vestido Léa - Parte 2", videoId: "vFlPZpGLJ1U", project: "Vestido Léa", part: 2, platform: "youtube" as const },
    
    // Vestido Infantil com Flores (2 partes)
    { id: 187, title: "Vestido Infantil com Flores - Parte 1", videoId: "JPxWe3bttUE", project: "Vestido Infantil Flores", part: 1, platform: "youtube" as const },
    { id: 188, title: "Vestido Infantil com Flores - Parte 2", videoId: "AJdQG3y5TvY", project: "Vestido Infantil Flores", part: 2, platform: "youtube" as const },
    
    // Saia Carneiros (2 partes)
    { id: 189, title: "Saia Carneiros - Parte 1", videoId: "v0GFZx3i5Dc", project: "Saia Carneiros", part: 1, platform: "youtube" as const },
    { id: 190, title: "Saia Carneiros - Parte 2", videoId: "rD06l4x5ot8", project: "Saia Carneiros", part: 2, platform: "youtube" as const },
    
    // Saída Sienna (4 partes)
    { id: 191, title: "Saída Sienna - Parte 1", videoId: "Q8_o19q7qkU", project: "Saída Sienna", part: 1, platform: "youtube" as const },
    { id: 192, title: "Saída Sienna - Parte 2", videoId: "v3KPfjM4rEU", project: "Saída Sienna", part: 2, platform: "youtube" as const },
    { id: 193, title: "Saída Sienna - Parte 3", videoId: "bzHs1bktTvs", project: "Saída Sienna", part: 3, platform: "youtube" as const },
    { id: 194, title: "Saída Sienna - Parte 4", videoId: "7UznYE_-Wjg", project: "Saída Sienna", part: 4, platform: "youtube" as const },
    
    // Vestido Celina (5 partes)
    { id: 195, title: "Vestido Celina - Parte 1", videoId: "2_LZiUijbcA", project: "Vestido Celina", part: 1, platform: "youtube" as const },
    { id: 196, title: "Vestido Celina - Parte 2", videoId: "tEFQR4v2lnU", project: "Vestido Celina", part: 2, platform: "youtube" as const },
    { id: 197, title: "Vestido Celina - Parte 3", videoId: "oGlf3rqwawI", project: "Vestido Celina", part: 3, platform: "youtube" as const },
    { id: 198, title: "Vestido Celina - Parte 4", videoId: "DDWCV3SPwLg", project: "Vestido Celina", part: 4, platform: "youtube" as const },
    { id: 199, title: "Vestido Celina - Parte 5", videoId: "tUrgpZiCJ90", project: "Vestido Celina", part: 5, platform: "youtube" as const },
    
    // Vestido Eduarda (4 partes)
    { id: 200, title: "Vestido Eduarda - Parte 1", videoId: "eo1Kr1DoOOo", project: "Vestido Eduarda", part: 1, platform: "youtube" as const },
    { id: 201, title: "Vestido Eduarda - Parte 2", videoId: "hTR7y32XKDY", project: "Vestido Eduarda", part: 2, platform: "youtube" as const },
    { id: 202, title: "Vestido Eduarda - Parte 3", videoId: "w_3fDMHVzhM", project: "Vestido Eduarda", part: 3, platform: "youtube" as const },
    { id: 203, title: "Vestido Eduarda - Parte 4", videoId: "Hi82e-EDTdg", project: "Vestido Eduarda", part: 4, platform: "youtube" as const },
    
    // Saída Dani (3 partes)
    { id: 204, title: "Saída Dani - Parte 1", videoId: "B4xhTJY_UyQ", project: "Saída Dani", part: 1, platform: "youtube" as const },
    { id: 205, title: "Saída Dani - Parte 2", videoId: "HQVLjo9_3sY", project: "Saída Dani", part: 2, platform: "youtube" as const },
    { id: 206, title: "Saída Dani - Parte 3", videoId: "wSuQxShxzNE", project: "Saída Dani", part: 3, platform: "youtube" as const },
    
    // Vestido Lollita (2 partes)
    { id: 207, title: "Vestido Lollita - Parte 1", videoId: "UtJlwdEklYQ", project: "Vestido Lollita", part: 1, platform: "youtube" as const },
    { id: 208, title: "Vestido Lollita - Parte 2", videoId: "l-MqIYIpOsM", project: "Vestido Lollita", part: 2, platform: "youtube" as const },
    
    // Vestido Barbados (3 partes)
    { id: 209, title: "Vestido Barbados - Parte 1", videoId: "KNH0RHLCb0s", project: "Vestido Barbados", part: 1, platform: "youtube" as const },
    { id: 210, title: "Vestido Barbados - Parte 2", videoId: "ZqRrV1-VW3A", project: "Vestido Barbados", part: 2, platform: "youtube" as const },
    { id: 211, title: "Vestido Barbados - Parte 3", videoId: "GSe98LWFD6I", project: "Vestido Barbados", part: 3, platform: "youtube" as const },
    
    // Batinha Chloe
    { id: 212, title: "Batinha Chloe", videoId: "a0nk3GoNm2Y", project: "Batinha Chloe", part: null, platform: "youtube" as const },
    
    // Vestido Cecilia (7 partes)
    { id: 213, title: "Vestido Cecilia - Parte 1", videoId: "oPu4Z0IE3wY", project: "Vestido Cecilia", part: 1, platform: "youtube" as const },
    { id: 214, title: "Vestido Cecilia - Parte 2", videoId: "d5Tm8u7pwv8", project: "Vestido Cecilia", part: 2, platform: "youtube" as const },
    { id: 215, title: "Vestido Cecilia - Parte 3", videoId: "Wyp8Kpc_wks", project: "Vestido Cecilia", part: 3, platform: "youtube" as const },
    { id: 216, title: "Vestido Cecilia - Parte 4", videoId: "jteLa2xCVak", project: "Vestido Cecilia", part: 4, platform: "youtube" as const },
    { id: 217, title: "Vestido Cecilia - Parte 5", videoId: "iz3BFH14d-E", project: "Vestido Cecilia", part: 5, platform: "youtube" as const },
    { id: 218, title: "Vestido Cecilia - Parte 6", videoId: "S2O4ilYCOyA", project: "Vestido Cecilia", part: 6, platform: "youtube" as const },
    { id: 219, title: "Vestido Cecilia - Parte 7", videoId: "JSoJ5DIrqzE", project: "Vestido Cecilia", part: 7, platform: "youtube" as const },
    
    // Batinha Zoe
    { id: 220, title: "Batinha Zoe", videoId: "Y2pzWhLOPJE", project: "Batinha Zoe", part: null, platform: "youtube" as const },
    
    // Biquíni Chalay (3 partes)
    { id: 221, title: "Biquíni Chalay - Parte 1", videoId: "TwqdE0XrQtw", project: "Biquíni Chalay", part: 1, platform: "youtube" as const },
    { id: 222, title: "Biquíni Chalay - Parte 2", videoId: "udU0xbBdy6A", project: "Biquíni Chalay", part: 2, platform: "youtube" as const },
    { id: 223, title: "Biquíni Chalay - Parte 3", videoId: "FhpLEq1oOW0", project: "Biquíni Chalay", part: 3, platform: "youtube" as const },
    
    // Vestido Ester (2 partes)
    { id: 224, title: "Vestido Ester - Parte 1", videoId: "aqVH4grJm-s", project: "Vestido Ester", part: 1, platform: "youtube" as const },
    { id: 225, title: "Vestido Ester - Parte 2", videoId: "DLtHowmmx5c", project: "Vestido Ester", part: 2, platform: "youtube" as const },
    
    // Bolsa Coral
    { id: 226, title: "Bolsa Coral", videoId: "dLiiKJD8PIc", project: "Bolsa Coral", part: null, platform: "youtube" as const },
    
    // Conjunto Beatriz (3 partes)
    { id: 227, title: "Conjunto Beatriz - Parte 1", videoId: "sAVpo6GMWkY", project: "Conjunto Beatriz", part: 1, platform: "youtube" as const },
    { id: 228, title: "Conjunto Beatriz - Parte 2", videoId: "5rpkorXexRM", project: "Conjunto Beatriz", part: 2, platform: "youtube" as const },
    { id: 229, title: "Conjunto Beatriz - Parte 3", videoId: "KrbdPy8Ngjw", project: "Conjunto Beatriz", part: 3, platform: "youtube" as const },
    
    // Vestido Raquel (3 partes)
    { id: 230, title: "Vestido Raquel - Parte 1", videoId: "9cPmHxYPu_4", project: "Vestido Raquel", part: 1, platform: "youtube" as const },
    { id: 231, title: "Vestido Raquel - Parte 2", videoId: "Y6EjggUaPDI", project: "Vestido Raquel", part: 2, platform: "youtube" as const },
    { id: 232, title: "Vestido Raquel - Parte 3", videoId: "LAKfdeZ-uvw", project: "Vestido Raquel", part: 3, platform: "youtube" as const },
    
    // Conjunto Mia (2 partes)
    { id: 233, title: "Conjunto Mia - Parte 1", videoId: "JjrbPHVsB9c", project: "Conjunto Mia", part: 1, platform: "youtube" as const },
    { id: 234, title: "Conjunto Mia - Parte 2", videoId: "sahh4NQgAbE", project: "Conjunto Mia", part: 2, platform: "youtube" as const },
    
    // Vestido Celeste (4 partes)
    { id: 235, title: "Vestido Celeste - Parte 1", videoId: "knZxZwuhfNk", project: "Vestido Celeste", part: 1, platform: "youtube" as const },
    { id: 236, title: "Vestido Celeste - Parte 2", videoId: "mEq1bWNCW9Q", project: "Vestido Celeste", part: 2, platform: "youtube" as const },
    { id: 237, title: "Vestido Celeste - Parte 3", videoId: "BGEOGV6gz74", project: "Vestido Celeste", part: 3, platform: "youtube" as const },
    { id: 238, title: "Vestido Celeste - Parte 4", videoId: "k-d8mWx5j6o", project: "Vestido Celeste", part: 4, platform: "youtube" as const },
  ].map((v, i) => ({ ...v, id: i + 1 }));

  // Extrair projetos únicos para o filtro
  const uniqueProjects = [...new Set(videos.map(v => v.project))];

  const [searchParams] = useSearchParams();
  const autoplayVideoId = searchParams.get("video");
  const shouldAutoplay = searchParams.get("autoplay") === "true";

  // Encontrar índice do vídeo baseado na URL
  const getInitialVideoIndex = () => {
    if (autoplayVideoId) {
      const index = videos.findIndex(v => v.videoId === autoplayVideoId);
      return index >= 0 ? index : 0;
    }
    return 0;
  };

  const isMobile = useIsMobile();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(getInitialVideoIndex);
  const [cameFromCarousel, setCameFromCarousel] = useState(!!autoplayVideoId);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const videoListRef = useRef<HTMLDivElement>(null);
  const videosPerPage = 12;

  // Helper para resolver URL da thumbnail
  const getThumbnailUrl = useCallback((video: { videoId: string; platform: string }) => {
    if (customThumbnails[video.videoId]) return customThumbnails[video.videoId];
    if (video.platform === "youtube") return `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
    if (video.platform === "gdrive") return `https://drive.google.com/thumbnail?id=${video.videoId}&sz=w640`;
    return `https://vumbnail.com/${video.videoId}.jpg`;
  }, []);

  // Preload thumbnails dos próximos 3 vídeos para navegação instantânea
  useEffect(() => {
    const preloadCount = 3;
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = currentVideoIndex + i;
      if (nextIndex < videos.length) {
        const img = new Image();
        img.src = getThumbnailUrl(videos[nextIndex]);
      }
    }
  }, [currentVideoIndex, getThumbnailUrl]);

  // Atualiza o índice quando a URL mudar
  useEffect(() => {
    if (autoplayVideoId) {
      const index = videos.findIndex(v => v.videoId === autoplayVideoId);
      if (index >= 0) {
        setCurrentVideoIndex(index);
        setCameFromCarousel(true);
      }
    }
  }, [autoplayVideoId]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === "all" || video.project === filterProject;
    return matchesSearch && matchesProject;
  });

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  const handleVideoSelect = (index: number) => {
    const actualIndex = videos.findIndex(v => v.id === filteredVideos[startIndex + index].id);
    setCurrentVideoIndex(actualIndex);
    setCameFromCarousel(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (cameFromCarousel) {
      setCurrentVideoIndex(0);
      setCameFromCarousel(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Módulos
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Principal + Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
                <CustomVideoPlayer
                  videoId={currentVideo.videoId}
                  title={currentVideo.title}
                  platform={currentVideo.platform as "youtube" | "vimeo"}
                  autoplay={true}
                  showPixMessage={currentVideo.id >= 111}
                />
              </div>
              
              {/* Botões de navegação abaixo do player */}
              <div className="flex gap-3 mt-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentVideoIndex === 0}
                  className="flex-1"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentVideoIndex === videos.length - 1}
                  className="flex-1"
                >
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de Vídeos */}
          <div className="lg:col-span-1 lg:row-span-2">
            <Card className="lg:sticky lg:top-8 shadow-card animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Todas as Aulas ({videos.length})
                </h3>

                {/* Filtros */}
                <div className="space-y-3 mb-4">
                  <Input
                    placeholder="Buscar aula ou projeto..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-10"
                  />
                  <Select value={filterProject} onValueChange={(value) => {
                    setFilterProject(value);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Filtrar por projeto" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="all">Todos os projetos</SelectItem>
                      {uniqueProjects.map(project => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista com scroll */}
                <div ref={videoListRef} className="space-y-3 max-h-[400px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {paginatedVideos.map((video, index) => {
                    const actualIndex = videos.findIndex(v => v.id === video.id);
                    return (
                      <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <VideoCard
                          title={video.title}
                          duration={video.part ? `Parte ${video.part}` : "Completo"}
                          thumbnail={getVideoThumbnail(video.videoId, video.platform)}
                          videoNumber={video.id}
                          isActive={actualIndex === currentVideoIndex}
                          onClick={() => handleVideoSelect(index)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        videoListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        videoListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sobre esta Aula */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Sobre esta Aula
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Neste tutorial completo, você aprenderá todas as técnicas necessárias para 
                  criar este lindo {currentVideo.project.toLowerCase()}. Siga o passo a passo com atenção e tire 
                  suas dúvidas nos comentários.
                </p>
                
                {/* Visualização do Projeto */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">IA</span>
                    Visualização do Projeto
                  </h4>
                  <div className={`grid grid-cols-1 ${(projectGraphics[currentVideo.project] || videoDiagrams[currentVideo.videoId]) ? 'sm:grid-cols-2' : ''} gap-4`}>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Resultado Final</p>
                      <div className="relative overflow-hidden rounded-lg border border-border bg-muted/30">
                        <img 
                          src={getVideoThumbnail(currentVideo.videoId, currentVideo.platform)} 
                          alt={`Preview do ${currentVideo.project}`}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    {(projectGraphics[currentVideo.project] || videoDiagrams[currentVideo.videoId]) && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">Diagrama de Pontos</p>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-white">
                          <img 
                            src={videoDiagrams[currentVideo.videoId] || projectGraphics[currentVideo.project]?.diagram} 
                            alt={`Diagrama de pontos do ${currentVideo.title}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-accent/20 border border-accent rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Materiais Necessários:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Linha de sua preferência (quantidade varia por projeto)</li>
                    <li>• Agulha de crochê adequada para a linha</li>
                    <li>• Tesoura e agulha de tapeçaria</li>
                    <li>• Marcadores de ponto (opcional)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </div>
  );
};

export default VestidosCroche;
