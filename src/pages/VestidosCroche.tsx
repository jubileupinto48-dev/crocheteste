import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { useState, useRef, useEffect } from "react";
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
  "FrF8zqjX9v0": vestidoLongoDiagram,
  "9v-7cZ090UQ": vestidoLongoDiagram,
  "AtCZ86FDwS8": vestidoLongoDiagram,
  "um0S-AKW1Bw": vestidoDecoteVDiagram,
  "QsG22SVKa94": vestidoCiganinhaDiagram,
  "Y1GzUp7eomU": vestidoLuxoDiagram,
  "BZmo7SG6Bhw": vestidoCleopatraDiagram,
  "CNe-elk8zm4": vestidoVirginiaDiagram,
};
// Custom thumbnails for videos whose YouTube thumbnails are unavailable
const customThumbnails: Record<string, string> = {
  "FrF8zqjX9v0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "9v-7cZ090UQ": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "AtCZ86FDwS8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "um0S-AKW1Bw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/fKqxGw4yvUY-HD_vwgf93.jpg",
  "QsG22SVKa94": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/Design_sem_nome_br7dpp.png",
  "Y1GzUp7eomU": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/_EEt2dLuozA-SD_t33uvg.jpg",
  "BZmo7SG6Bhw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/Ia19Yf-H08g-HD_qd4m2h.jpg",
  "NCqCYKbRFHc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286793/fKLX4pMjmck-SD_bnzvlf.jpg",
  "45dtXS7wZJ8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286572/vrCyt1O4SjU-HD_nti0w1.jpg",
  // Novos vídeos
  "a4lixrXFbRA": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/Square_lcapbv.jpg",
  "nwxsLI9augM": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/Sereia_nqhrmj.jpg",
  "7C6SfLQmt8Y": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/ana_clara_isprr9.jpg",
  "DP1mn66td7Q": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305845/vestido_camila_qd9qtd.jpg",
  "PW5hDw2nUtU": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/Conchas_sobfyn.jpg",
  "jPkC8qflXQ0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/darlene_lsmigi.jpg",
  "s8zW8zIf-vo": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305962/Vestido_Croch%C3%AA_Saida_recu1m.jpg",
  "8ydUaSlgKaM": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/Evelyne_vgpz1r.jpg",
  "J3x6r9a9z3Q": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771306272/Vestido_Flavia_s2dixj.jpg",
  "-_YBIfqPWXc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/Longo_Noiva_c1p5t8.jpg",
  "hV4_YNI4fp0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/lore_ilw2an.jpg",
  "L1krqeffIvw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/mo%C3%A7ambique_wvuoup.jpg",
  "DmvjtsXuwKc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771306403/Design_sem_nome_6_d73xyh.png",
  "ap1OEUJZ-S4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/sousplate_u8qesy.jpg",
  "F5rSrKqmnn8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/tereza_fyt2v7.jpg",
  "SqZwxKEdwro": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771306716/iU1sYamfIVk-HD_ibcrxn.jpg",
  "Ukk510YlxvI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/renata_h8xajx.jpg",
  "dCUvTg-IxkE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/betania_xcfpnn.jpg",
  "ksG_iQGCb2c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/saia_midi_rws7jx.png",
  "n0uIvqvmLWY": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Gardeen_bydvt2.jpg",
  "9ciFxAnLzqw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/corset_de_croche_ngaefh.jpg",
  "MWEsludGR4A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/corset_angel_g6z2jg.jpg",
  "oO-1-Bx2_k4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/corset_em_v_kwwode.jpg",
  "-Dqpc_vBDcE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Conjunto_svaxry.jpg",
  "8G8KSbtb9AA": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/tardezinha_ogtoie.jpg",
  "XMJm74FZSlk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/conjunto_rosas_otscb3.jpg",
  "t4PHjsA531c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/conjunto_brilho_hrkbp0.jpg",
  "8-7-TAnZeTI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Praiana_r8wcy2.jpg",
  "fqfFgB0VDE8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/camila_euvcxi.jpg",
  "lG2KfsR4pts": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/macac%C3%A3o_qidwbc.jpg",
  "3p8V_UJnQ7s": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/cal%C3%A7a_thais_wmf6np.jpg",
  "ow79AEL-HJ0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/DxUeSn4p-Rg-HD_eodqdw.jpg",
  "eULL4c7GCAs": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/S-Vp3QiN1Tk-HD_td6d0k.jpg",
  "AkMPZPYJxwY": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/IRnqSP9VCsg-HD_ixsndz.jpg",
  // Vestido Virginia (ex-Sereia)
  "CNe-elk8zm4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108167/XuuJvrgxk-8-HD_a5fzw6.jpg",
  // Vestido Angel
  "QmMtlJu0cTI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "cCFOGukAh-Y": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "1q8PAEcytMk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  // Saída Mel Maia
  "MV86APDdJrE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/Pxiscx0QsCE-HD_vgc3vg.jpg",
  "WPavNu7xI_o": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/Pxiscx0QsCE-HD_vgc3vg.jpg",
  // Vestido Maria
  "esZk0CWJPxw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "RFPdFNMXSxo": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "d1DB5J1cHmk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  // Vestido Juliana Paes
  "3GLLTdColiE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "Mx4tkT0Qyew": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "g4oWC8uHiY4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "RWGTCFU8GjM": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  // Calça Crochê Correntinha
  "23pELsHCpw0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/ufx3WuaI9OA-HD_eqphem.jpg",
  // Calça de Crochê Tela
  "kEfX4uBE8_w": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/e7ud56CxnFg-HD_zkxaox.jpg",
  // Conjunto Paetê
  "QMuwadztjHk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/vSmgk4ZLpnk-HD_pi9wvu.jpg",
  // Cropped Ana Clara
  "qTFQF2JuxMY": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/Kyx_qC1X7n8-HD_htvsx9.jpg",
  // Conjunto Gabi
  "fm3XUSkCy3c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "5zNb43Hi7MQ": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "kUM9BDOY2B4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  // Conjunto Franjas
  "7BuqNEXwXKw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/751Ukhdt-ek-HD_oxpxw3.jpg",
  "rhmemKGV9N8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/751Ukhdt-ek-HD_oxpxw3.jpg",
  // Saia Laura
  "P0Emfo_2qsU": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/v-BUiu4uwg4-HD_waluwn.jpg",
  // Vestido Patricia
  "o0Txp_D4c1M": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/F-9MR785gNY-HD_kikzd5.jpg",
  "gF4LIZrQIQw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/F-9MR785gNY-HD_kikzd5.jpg",
  // Vestido Sophia
  "IXkkWfjBD_A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/yZUAkvXZ4jc-HD_epymh7.jpg",
  // Vestido Moana
  "W6NReaWkX-4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/Byf4O1RD65s-HD_fvvbon.jpg",
  // Vestido Vanessa
  "vygTLCKLTyI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/ymNF5gXSCg0-HD_o5bvp3.jpg",
  "vhJm0SkK0pI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/ymNF5gXSCg0-HD_o5bvp3.jpg",
};

const getVideoThumbnail = (videoId: string) => {
  return customThumbnails[videoId] || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const VestidosCroche = () => {
  const videos = [
    // ===== DESTAQUES PRINCIPAIS =====
    { id: 1, title: "Vestido Longo de Crochê", videoId: "FrF8zqjX9v0", project: "Destaque", part: null },
    { id: 2, title: "Vestido Longo de Crochê 2", videoId: "9v-7cZ090UQ", project: "Destaque", part: null },
    { id: 3, title: "Vestido Longo de Crochê 3", videoId: "AtCZ86FDwS8", project: "Destaque", part: null },
    { id: 4, title: "Vestido Decote V", videoId: "um0S-AKW1Bw", project: "Destaque", part: null },
    
    // ===== NOVOS VÍDEOS =====
    { id: 5, title: "Vestido Ciganinha", videoId: "QsG22SVKa94", project: "Destaque", part: null },
    { id: 6, title: "Vestido Luxo", videoId: "Y1GzUp7eomU", project: "Destaque", part: null },
    { id: 7, title: "Vestido Cleópatra", videoId: "BZmo7SG6Bhw", project: "Destaque", part: null },
    { id: 8, title: "Conjunto Rosas", videoId: "XMJm74FZSlk", project: "Conjunto Rosas", part: null },
    { id: 9, title: "Top Estrela Brasil", videoId: "eULL4c7GCAs", project: "Top Estrela Brasil", part: null },
    
    // ===== NOVOS VÍDEOS (após Biquini Tomara que Caia) =====
    { id: 10, title: "Conjunto Square", videoId: "a4lixrXFbRA", project: "Conjunto Square", part: null },
    { id: 11, title: "Vestido Sereia", videoId: "nwxsLI9augM", project: "Vestido Sereia", part: null },
    { id: 12, title: "Vestido Ana Clara", videoId: "7C6SfLQmt8Y", project: "Vestido Ana Clara", part: null },
    { id: 13, title: "Vestido Camila", videoId: "DP1mn66td7Q", project: "Vestido Camila", part: null },
    { id: 14, title: "Vestido Concha", videoId: "PW5hDw2nUtU", project: "Vestido Concha", part: null },
    { id: 15, title: "Vestido Darlene", videoId: "jPkC8qflXQ0", project: "Vestido Darlene", part: null },
    { id: 16, title: "Vestido Crochê Saida", videoId: "s8zW8zIf-vo", project: "Vestido Crochê Saida", part: null },
    { id: 17, title: "Vestido Evelyne", videoId: "8ydUaSlgKaM", project: "Vestido Evelyne", part: null },
    { id: 18, title: "Vestido Flavia", videoId: "J3x6r9a9z3Q", project: "Vestido Flavia", part: null },
    { id: 19, title: "Vestido Noiva Longo", videoId: "-_YBIfqPWXc", project: "Vestido Noiva Longo", part: null },
    { id: 20, title: "Vestido Lore", videoId: "hV4_YNI4fp0", project: "Vestido Lore Solo", part: null },
    { id: 21, title: "Vestido Moçambique", videoId: "L1krqeffIvw", project: "Vestido Moçambique", part: null },
    { id: 22, title: "Vestido Raira", videoId: "DmvjtsXuwKc", project: "Vestido Raira", part: null },
    { id: 23, title: "Sousplato Girafa", videoId: "ap1OEUJZ-S4", project: "Sousplato Girafa", part: null },
    { id: 24, title: "Saida Tereza", videoId: "F5rSrKqmnn8", project: "Saida Tereza", part: null },
    { id: 25, title: "Saida Shirley", videoId: "SqZwxKEdwro", project: "Saida Shirley", part: null },
    { id: 26, title: "Saida Renata", videoId: "Ukk510YlxvI", project: "Saida Renata", part: null },
    { id: 27, title: "Saida Betania", videoId: "dCUvTg-IxkE", project: "Saida Betania", part: null },
    { id: 28, title: "Saida Midi", videoId: "ksG_iQGCb2c", project: "Saida Midi", part: null },
    { id: 29, title: "Cropped Garden", videoId: "n0uIvqvmLWY", project: "Cropped Garden", part: null },
    { id: 30, title: "Corset de Crochê", videoId: "9ciFxAnLzqw", project: "Corset de Crochê", part: null },
    { id: 31, title: "Corset Angel", videoId: "MWEsludGR4A", project: "Corset Angel", part: null },
    { id: 32, title: "Corset em V", videoId: "oO-1-Bx2_k4", project: "Corset em V", part: null },
    { id: 33, title: "Conjunto Tereza", videoId: "-Dqpc_vBDcE", project: "Conjunto Tereza", part: null },
    { id: 34, title: "Conjunto Tardezinha", videoId: "8G8KSbtb9AA", project: "Conjunto Tardezinha", part: null },
    { id: 35, title: "Biquini Rendado", videoId: "NCqCYKbRFHc", project: "Destaque", part: null },
    { id: 36, title: "Conjunto de Crochê Brilho", videoId: "t4PHjsA531c", project: "Conjunto Crochê Brilho", part: null },
    { id: 37, title: "Conjunto Praiana", videoId: "8-7-TAnZeTI", project: "Conjunto Praiana", part: null },
    { id: 38, title: "Conjunto Camila", videoId: "fqfFgB0VDE8", project: "Conjunto Camila", part: null },
    { id: 39, title: "Macacão Longo", videoId: "lG2KfsR4pts", project: "Macacão Longo", part: null },
    { id: 40, title: "Calça Thais", videoId: "3p8V_UJnQ7s", project: "Calça Thais", part: null },
    { id: 41, title: "Saida Brasil", videoId: "ow79AEL-HJ0", project: "Saida Brasil", part: null },
    { id: 42, title: "Biquini Tomara que Caia", videoId: "45dtXS7wZJ8", project: "Destaque", part: null },
    { id: 43, title: "Top Brasil", videoId: "AkMPZPYJxwY", project: "Top Brasil", part: null },

    { id: 44, title: "Vestido Virginia", videoId: "CNe-elk8zm4", project: "Destaque", part: null },
    
    // ===== DESTAQUES =====
    // Vestido Angel (3 partes)
    { id: 45, title: "Vestido Angel - Parte 1", videoId: "QmMtlJu0cTI", project: "Vestido Angel", part: 1 },
    { id: 46, title: "Vestido Angel - Parte 2", videoId: "cCFOGukAh-Y", project: "Vestido Angel", part: 2 },
    { id: 47, title: "Vestido Angel - Parte 3", videoId: "1q8PAEcytMk", project: "Vestido Angel", part: 3 },
    
    // Saída Mel Maia (2 partes)
    { id: 48, title: "Saída Mel Maia - Parte 1", videoId: "MV86APDdJrE", project: "Saída Mel Maia", part: 1 },
    { id: 49, title: "Saída Mel Maia - Parte 2", videoId: "WPavNu7xI_o", project: "Saída Mel Maia", part: 2 },
    
    // Vestido Maria (3 partes)
    { id: 50, title: "Vestido Maria - Parte 1", videoId: "esZk0CWJPxw", project: "Vestido Maria", part: 1 },
    { id: 51, title: "Vestido Maria - Parte 2", videoId: "RFPdFNMXSxo", project: "Vestido Maria", part: 2 },
    { id: 52, title: "Vestido Maria - Parte 3", videoId: "d1DB5J1cHmk", project: "Vestido Maria", part: 3 },
    
    // Vestido Juliana Paes (4 partes)
    { id: 53, title: "Vestido Juliana Paes - Parte 1", videoId: "3GLLTdColiE", project: "Vestido Juliana Paes", part: 1 },
    { id: 54, title: "Vestido Juliana Paes - Parte 2", videoId: "Mx4tkT0Qyew", project: "Vestido Juliana Paes", part: 2 },
    { id: 55, title: "Vestido Juliana Paes - Parte 3", videoId: "g4oWC8uHiY4", project: "Vestido Juliana Paes", part: 3 },
    { id: 56, title: "Vestido Juliana Paes - Parte 4", videoId: "RWGTCFU8GjM", project: "Vestido Juliana Paes", part: 4 },
    
    // ===== OUTROS PROJETOS =====
    // Calça Crochê Correntinha
    { id: 57, title: "Calça Crochê Correntinha", videoId: "23pELsHCpw0", project: "Calça Crochê Correntinha", part: null },
    
    // Calça de Crochê Tela
    { id: 58, title: "Calça de Crochê Tela", videoId: "kEfX4uBE8_w", project: "Calça de Crochê Tela", part: null },
    
    // Conjunto de Crochê com paetê
    { id: 59, title: "Conjunto de Crochê com Paetê de Acrílico Espelhado", videoId: "QMuwadztjHk", project: "Conjunto Paetê", part: null },
    
    // Cropped Ana Clara
    { id: 60, title: "Cropped Ana Clara", videoId: "qTFQF2JuxMY", project: "Cropped Ana Clara", part: null },
    
    // Conjunto Gabi (3 partes)
    { id: 61, title: "Conjunto Gabi - Parte 1", videoId: "fm3XUSkCy3c", project: "Conjunto Gabi", part: 1 },
    { id: 62, title: "Conjunto Gabi - Parte 2", videoId: "5zNb43Hi7MQ", project: "Conjunto Gabi", part: 2 },
    { id: 63, title: "Conjunto Gabi - Parte 3", videoId: "kUM9BDOY2B4", project: "Conjunto Gabi", part: 3 },
    
    // Conjunto Franjas (2 partes)
    { id: 64, title: "Conjunto Franjas - Parte 1", videoId: "7BuqNEXwXKw", project: "Conjunto Franjas", part: 1 },
    { id: 65, title: "Conjunto Franjas - Parte 2", videoId: "rhmemKGV9N8", project: "Conjunto Franjas", part: 2 },
    
    // Saia Laura
    { id: 66, title: "Saia Laura", videoId: "P0Emfo_2qsU", project: "Saia Laura", part: null },
    
    // Vestido Patricia (2 partes)
    { id: 67, title: "Vestido Patricia - Parte 1", videoId: "o0Txp_D4c1M", project: "Vestido Patricia", part: 1 },
    { id: 68, title: "Vestido Patricia - Parte 2", videoId: "gF4LIZrQIQw", project: "Vestido Patricia", part: 2 },
    
    // Vestido Sophia
    { id: 69, title: "Vestido Sophia", videoId: "IXkkWfjBD_A", project: "Vestido Sophia", part: null },
    
    // Vestido Moana
    { id: 70, title: "Vestido Moana", videoId: "W6NReaWkX-4", project: "Vestido Moana", part: null },
    
    // Vestido Vanessa (3 partes)
    { id: 71, title: "Vestido Vanessa - Parte 1", videoId: "vygTLCKLTyI", project: "Vestido Vanessa", part: 1 },
    { id: 72, title: "Vestido Vanessa - Parte 2", videoId: "vhJm0SkK0pI", project: "Vestido Vanessa", part: 2 },
    { id: 73, title: "Vestido Vanessa - Parte 3", videoId: "2HnnZJQknxo", project: "Vestido Vanessa", part: 3 },
    
    // Vestido Vanda
    { id: 74, title: "Vestido Vanda", videoId: "atPZOkilT3E", project: "Vestido Vanda", part: null },
    
    // Biquini Eva
    { id: 75, title: "Biquíni Eva", videoId: "3SclyOpltZY", project: "Biquíni Eva", part: null },
    
    // Saia Amanda
    { id: 76, title: "Saia Amanda", videoId: "nTGYxzVaMPY", project: "Saia Amanda", part: null },
    
    // Vestido Bel (2 partes)
    { id: 77, title: "Vestido Bel - Parte 1", videoId: "xj3hnYfdrNk", project: "Vestido Bel", part: 1 },
    { id: 78, title: "Vestido Bel - Parte 2", videoId: "AADIV-AOdvg", project: "Vestido Bel", part: 2 },
    
    // Cropped Duda
    { id: 79, title: "Cropped Duda", videoId: "mE-dHVyvqcE", project: "Cropped Duda", part: null },
    
    // Vestido Marina (2 partes)
    { id: 80, title: "Vestido Marina - Parte 1", videoId: "C957amxwu-Q", project: "Vestido Marina", part: 1 },
    { id: 81, title: "Vestido Marina - Parte 2", videoId: "_WpirLo1zSo", project: "Vestido Marina", part: 2 },
    
    // Vestido Ana Paula (4 partes)
    { id: 82, title: "Vestido Ana Paula - Parte 1", videoId: "SJokhYU5TLU", project: "Vestido Ana Paula", part: 1 },
    { id: 83, title: "Vestido Ana Paula - Parte 2", videoId: "BOA1BJztukI", project: "Vestido Ana Paula", part: 2 },
    { id: 84, title: "Vestido Ana Paula - Parte 3", videoId: "AMQY7A2jP_A", project: "Vestido Ana Paula", part: 3 },
    { id: 85, title: "Vestido Ana Paula - Parte 4", videoId: "_3a57tDzcXQ", project: "Vestido Ana Paula", part: 4 },
    
    // Conjunto Lisi (2 partes)
    { id: 86, title: "Conjunto Lisi - Parte 1", videoId: "mANxt1_-pOs", project: "Conjunto Lisi", part: 1 },
    { id: 87, title: "Conjunto Lisi - Parte 2", videoId: "2VEqAPlZmPw", project: "Conjunto Lisi", part: 2 },
    
    // Saia Nina
    { id: 88, title: "Saia Nina", videoId: "_ykov0rTYJI", project: "Saia Nina", part: null },
    
    // Vestido Ana
    { id: 89, title: "Vestido Ana", videoId: "m3_1jw04ejo", project: "Vestido Ana", part: null },
    
    // Vestido Yara (2 partes)
    { id: 90, title: "Vestido Yara - Parte 1", videoId: "zKuJUuEcRyw", project: "Vestido Yara", part: 1 },
    { id: 91, title: "Vestido Yara - Parte 2", videoId: "wv6UEXc8SH0", project: "Vestido Yara", part: 2 },
    
    // Conjunto Letícia
    { id: 92, title: "Conjunto Letícia", videoId: "3RS09kjuVuA", project: "Conjunto Letícia", part: null },
    
    // Conjunto Lore (5 partes)
    { id: 93, title: "Conjunto Lore - Parte 1", videoId: "PAPz5f9o55U", project: "Conjunto Lore", part: 1 },
    { id: 94, title: "Conjunto Lore - Parte 2", videoId: "m8oFjAqpK-s", project: "Conjunto Lore", part: 2 },
    { id: 95, title: "Conjunto Lore - Parte 3", videoId: "9a-u0Fsp_q4", project: "Conjunto Lore", part: 3 },
    { id: 96, title: "Conjunto Lore - Parte 4", videoId: "R97m7OREsmY", project: "Conjunto Lore", part: 4 },
    { id: 97, title: "Conjunto Lore - Parte 5", videoId: "umn9tQ1n0lg", project: "Conjunto Lore", part: 5 },
    
    // Vestido Nala (2 partes)
    { id: 98, title: "Vestido Nala - Parte 1", videoId: "rTEQcitKu_A", project: "Vestido Nala", part: 1 },
    { id: 99, title: "Vestido Nala - Parte 2", videoId: "5MWxPBVyT8Y", project: "Vestido Nala", part: 2 },
    
    // Macacão Grassi (2 partes)
    { id: 100, title: "Macacão Grassi - Parte 1", videoId: "_fhKtLIQJ88", project: "Macacão Grassi", part: 1 },
    { id: 101, title: "Macacão Grassi - Parte 2", videoId: "498muKXS9Pw", project: "Macacão Grassi", part: 2 },
    
    // Suéter Sofia (2 partes)
    { id: 102, title: "Suéter Sofia - Parte 1", videoId: "btJKMwI02kA", project: "Suéter Sofia", part: 1 },
    { id: 103, title: "Suéter Sofia - Parte 2", videoId: "Yavxmgsl7Hc", project: "Suéter Sofia", part: 2 },
    
    // Vestido Larissa (3 partes)
    { id: 104, title: "Vestido Larissa - Parte 1", videoId: "tagRcIE3Rm0", project: "Vestido Larissa", part: 1 },
    { id: 105, title: "Vestido Larissa - Parte 2", videoId: "lGllIFXHtB0", project: "Vestido Larissa", part: 2 },
    { id: 106, title: "Vestido Larissa - Parte 3", videoId: "f0_T20Zf0Gw", project: "Vestido Larissa", part: 3 },
    
    // Cropped Lolla
    { id: 107, title: "Cropped Lolla", videoId: "Gp2NpNQMNVI", project: "Cropped Lolla", part: null },
    
    // Conjunto Cali (4 partes)
    { id: 108, title: "Conjunto Cali - Parte 1", videoId: "Y-HlS3HnIL0", project: "Conjunto Cali", part: 1 },
    { id: 109, title: "Conjunto Cali - Parte 2", videoId: "wgNmrCWnjYo", project: "Conjunto Cali", part: 2 },
    { id: 110, title: "Conjunto Cali - Parte 3", videoId: "KZect7nHK3I", project: "Conjunto Cali", part: 3 },
    { id: 111, title: "Conjunto Cali - Parte 4", videoId: "Eq5gYpk_U4k", project: "Conjunto Cali", part: 4 },
    
    // Vestido Patricia Poeta (3 partes)
    { id: 112, title: "Vestido Patricia Poeta - Parte 1", videoId: "9e8IMdIJWdE", project: "Vestido Patricia Poeta", part: 1 },
    { id: 113, title: "Vestido Patricia Poeta - Parte 2", videoId: "yU5TkTe5m1Y", project: "Vestido Patricia Poeta", part: 2 },
    { id: 114, title: "Vestido Patricia Poeta - Parte 3", videoId: "OhMGhWsXxok", project: "Vestido Patricia Poeta", part: 3 },
    
    // Conjunto Zelly (3 partes)
    { id: 115, title: "Conjunto Zelly - Parte 1", videoId: "jxe4-eZwGwQ", project: "Conjunto Zelly", part: 1 },
    { id: 116, title: "Conjunto Zelly - Parte 2", videoId: "Z6viihH1OHw", project: "Conjunto Zelly", part: 2 },
    { id: 117, title: "Conjunto Zelly - Parte 3", videoId: "rXHydF8r2yU", project: "Conjunto Zelly", part: 3 },
    
    // Cropped Livia
    { id: 118, title: "Cropped Livia", videoId: "QfJUjcU7ZTU", project: "Cropped Livia", part: null },
    
    // Vestido Alice (2 partes)
    { id: 119, title: "Vestido Alice - Parte 1", videoId: "tXYVzevsCEA", project: "Vestido Alice", part: 1 },
    { id: 120, title: "Vestido Alice - Parte 2", videoId: "UEZOTs4Bjw0", project: "Vestido Alice", part: 2 },
    
    // Conjunto Renata (2 partes)
    { id: 121, title: "Conjunto Renata - Parte 1", videoId: "mpwaRW5yMXc", project: "Conjunto Renata", part: 1 },
    { id: 122, title: "Conjunto Renata - Parte 2", videoId: "-Iu0FaXkuAo", project: "Conjunto Renata", part: 2 },
    
    // Vestido Ana (segundo)
    { id: 123, title: "Vestido Ana II", videoId: "EBHjI1mVKxA", project: "Vestido Ana II", part: null },
    
    // Vestido Lari (3 partes)
    { id: 124, title: "Vestido Lari - Parte 1", videoId: "tsWy6DxF14M", project: "Vestido Lari", part: 1 },
    { id: 125, title: "Vestido Lari - Parte 2", videoId: "Thn0KVRjcok", project: "Vestido Lari", part: 2 },
    { id: 126, title: "Vestido Lari - Parte 3", videoId: "piaFF1nlxso", project: "Vestido Lari", part: 3 },
    
    // Vestido Nay (2 partes)
    { id: 127, title: "Vestido Nay - Parte 1", videoId: "hWpuYeic9Cw", project: "Vestido Nay", part: 1 },
    { id: 128, title: "Vestido Nay - Parte 2", videoId: "0lqNycXsXWE", project: "Vestido Nay", part: 2 },
    
    // Vestido Yara (segundo)
    { id: 129, title: "Vestido Yara II", videoId: "ORapj3rePNs", project: "Vestido Yara II", part: null },
    
    // Conjunto Íris (2 partes)
    { id: 130, title: "Conjunto Íris - Parte 1", videoId: "YtLjwU-Db2w", project: "Conjunto Íris", part: 1 },
    { id: 131, title: "Conjunto Íris - Parte 2", videoId: "7K0_9wxdMvo", project: "Conjunto Íris", part: 2 },
    
    // Conjunto Salles (3 partes)
    { id: 132, title: "Conjunto Salles - Parte 1", videoId: "cUqJUYwBa5Q", project: "Conjunto Salles", part: 1 },
    { id: 133, title: "Conjunto Salles - Parte 2", videoId: "Ty-OoJH-C3M", project: "Conjunto Salles", part: 2 },
    { id: 134, title: "Conjunto Salles - Parte 3", videoId: "GzBaR84iQsE", project: "Conjunto Salles", part: 3 },
    
    // Conjunto Scheila (2 partes)
    { id: 135, title: "Conjunto Scheila - Parte 1", videoId: "xv2dowFOhO0", project: "Conjunto Scheila", part: 1 },
    { id: 136, title: "Conjunto Scheila - Parte 2", videoId: "RAR1S3ES-kA", project: "Conjunto Scheila", part: 2 },
    
    // Cropped Angel
    { id: 137, title: "Cropped Angel", videoId: "t4AI9uTrVts", project: "Cropped Angel", part: null },
    
    // Cropped Anitta
    { id: 138, title: "Cropped Anitta", videoId: "40gsEHSnbJY", project: "Cropped Anitta", part: null },
    
    // Cropped Maré
    { id: 139, title: "Cropped Maré", videoId: "3XGhrDxunQ0", project: "Cropped Maré", part: null },
    
    // Vestido Estrella (2 partes)
    { id: 140, title: "Vestido Estrella - Parte 1", videoId: "WljMCbcNS5E", project: "Vestido Estrella", part: 1 },
    { id: 141, title: "Vestido Estrella - Parte 2", videoId: "SbWlKS41gkw", project: "Vestido Estrella", part: 2 },
    
    // Vestido Lore (4 partes)
    { id: 142, title: "Vestido Lore - Parte 1", videoId: "t53TD8lwI14", project: "Vestido Lore", part: 1 },
    { id: 143, title: "Vestido Lore - Parte 2", videoId: "MA7_cOiRg7E", project: "Vestido Lore", part: 2 },
    { id: 144, title: "Vestido Lore - Parte 3", videoId: "MJE5_uAo26k", project: "Vestido Lore", part: 3 },
    { id: 145, title: "Vestido Lore - Parte 4", videoId: "NfjrvIXu5uE", project: "Vestido Lore", part: 4 },
    
    // Vestido Gaia (2 partes)
    { id: 146, title: "Vestido Gaia - Parte 1", videoId: "NvNkvz1Wp_I", project: "Vestido Gaia", part: 1 },
    { id: 147, title: "Vestido Gaia - Parte 2", videoId: "hcYeXZs023I", project: "Vestido Gaia", part: 2 },
    
    // Vestido Yasmin (3 partes)
    { id: 148, title: "Vestido Yasmin - Parte 1", videoId: "tHbOidDsGgw", project: "Vestido Yasmin", part: 1 },
    { id: 149, title: "Vestido Yasmin - Parte 2", videoId: "Coxx_IZvUIY", project: "Vestido Yasmin", part: 2 },
    { id: 150, title: "Vestido Yasmin - Parte 3", videoId: "0qdMe4MV9yM", project: "Vestido Yasmin", part: 3 },
    
    // Conjunto Suri (5 partes)
    { id: 151, title: "Conjunto Suri - Parte 1", videoId: "jdz_X69RGlo", project: "Conjunto Suri", part: 1 },
    { id: 152, title: "Conjunto Suri - Parte 2", videoId: "3CxncyzC2pc", project: "Conjunto Suri", part: 2 },
    { id: 153, title: "Conjunto Suri - Parte 3", videoId: "8LT66fWB6LE", project: "Conjunto Suri", part: 3 },
    { id: 154, title: "Conjunto Suri - Parte 4", videoId: "2l8m8xx_Xd4", project: "Conjunto Suri", part: 4 },
    { id: 155, title: "Conjunto Suri - Parte 5", videoId: "I0MAot5zZYo", project: "Conjunto Suri", part: 5 },
    
    // Vestido Lorena (5 partes)
    { id: 156, title: "Vestido Lorena - Parte 1", videoId: "wYK9dr2ej8s", project: "Vestido Lorena", part: 1 },
    { id: 157, title: "Vestido Lorena - Parte 2", videoId: "uTQkwhhv-UQ", project: "Vestido Lorena", part: 2 },
    { id: 158, title: "Vestido Lorena - Parte 3", videoId: "imeIgdGRsyw", project: "Vestido Lorena", part: 3 },
    { id: 159, title: "Vestido Lorena - Parte 4", videoId: "gRsGLrTpxIM", project: "Vestido Lorena", part: 4 },
    { id: 160, title: "Vestido Lorena - Parte 5", videoId: "aGLzzwJkNeQ", project: "Vestido Lorena", part: 5 },
    
    // Bolsa de Crochê
    { id: 161, title: "Bolsa de Crochê", videoId: "VGk7GMxhrME", project: "Bolsa de Crochê", part: null },
    
    // Saída Rayssa (2 partes)
    { id: 162, title: "Saída Rayssa - Parte 1", videoId: "vu2MeYApu_A", project: "Saída Rayssa", part: 1 },
    { id: 163, title: "Saída Rayssa - Parte 2", videoId: "4UTIaRLbZ74", project: "Saída Rayssa", part: 2 },
    
    // Vestido Sol (3 partes)
    { id: 164, title: "Vestido Sol - Parte 1", videoId: "DIOCJ-HG5g4", project: "Vestido Sol", part: 1 },
    { id: 165, title: "Vestido Sol - Parte 2", videoId: "leIirPP43fA", project: "Vestido Sol", part: 2 },
    { id: 166, title: "Vestido Sol - Parte 3", videoId: "C0wJap6TzOo", project: "Vestido Sol", part: 3 },
    
    // Vestido Abacaxi (2 partes)
    { id: 167, title: "Vestido Abacaxi - Parte 1", videoId: "sBGHr6aSevQ", project: "Vestido Abacaxi", part: 1 },
    { id: 168, title: "Vestido Abacaxi - Parte 2", videoId: "s8e8lbmqYSY", project: "Vestido Abacaxi", part: 2 },
    
    // Vestido Bella (3 partes)
    { id: 169, title: "Vestido Bella - Parte 1", videoId: "CA2UaeVF4Kg", project: "Vestido Bella", part: 1 },
    { id: 170, title: "Vestido Bella - Parte 2", videoId: "DVqqw8Dcxxg", project: "Vestido Bella", part: 2 },
    { id: 171, title: "Vestido Bella - Parte 3", videoId: "0ci6lDnmWK4", project: "Vestido Bella", part: 3 },
    
    // Vestido e Cropped Julia (2 partes)
    { id: 172, title: "Vestido e Cropped Julia - Parte 1", videoId: "29b_BL-L0dw", project: "Vestido e Cropped Julia", part: 1 },
    { id: 173, title: "Vestido e Cropped Julia - Parte 2", videoId: "S6ekc5BgMqM", project: "Vestido e Cropped Julia", part: 2 },
    
    // Vestido Brunnet (3 partes)
    { id: 174, title: "Vestido Brunnet - Parte 1", videoId: "FN_OFnIJK_0", project: "Vestido Brunnet", part: 1 },
    { id: 175, title: "Vestido Brunnet - Parte 2", videoId: "Xc55DMK6q-s", project: "Vestido Brunnet", part: 2 },
    { id: 176, title: "Vestido Brunnet - Parte 3", videoId: "t9uTNN1DzvU", project: "Vestido Brunnet", part: 3 },
    
    // Conjunto Tamiris (2 partes)
    { id: 177, title: "Conjunto Tamiris - Parte 1", videoId: "wRGwVev34bk", project: "Conjunto Tamiris", part: 1 },
    { id: 178, title: "Conjunto Tamiris - Parte 2", videoId: "AjoW1enGcGk", project: "Conjunto Tamiris", part: 2 },
    
    // Vestido Anitta
    { id: 179, title: "Vestido Anitta", videoId: "vjdcTjhCOHI", project: "Vestido Anitta", part: null },
    
    // Cropped Amari
    { id: 180, title: "Cropped Amari", videoId: "8utWdn_DFgg", project: "Cropped Amari", part: null },
    
    // Cropped Tati
    { id: 181, title: "Cropped Tati", videoId: "oUrvkDdDdiU", project: "Cropped Tati", part: null },
    
    // Vestido Dubai
    { id: 182, title: "Vestido Dubai - Aula Parcelada", videoId: "i-55PjpIhtw", project: "Vestido Dubai", part: null },
    
    // Vestido Laís (3 partes)
    { id: 183, title: "Vestido Laís - Parte 1", videoId: "Ip8HhIZ-XTw", project: "Vestido Laís", part: 1 },
    { id: 184, title: "Vestido Laís - Parte 2", videoId: "XO4uMvRd2wg", project: "Vestido Laís", part: 2 },
    { id: 185, title: "Vestido Laís - Parte 3", videoId: "u4MrCZqnjLQ", project: "Vestido Laís", part: 3 },
    
    // Vestido Léa (2 partes)
    { id: 186, title: "Vestido Léa - Parte 1", videoId: "anqMDNT27Z4", project: "Vestido Léa", part: 1 },
    { id: 187, title: "Vestido Léa - Parte 2", videoId: "vFlPZpGLJ1U", project: "Vestido Léa", part: 2 },
    
    // Vestido de Crochê Infantil com Flores (2 partes)
    { id: 188, title: "Vestido Infantil com Flores - Parte 1", videoId: "JPxWe3bttUE", project: "Vestido Infantil Flores", part: 1 },
    { id: 189, title: "Vestido Infantil com Flores - Parte 2", videoId: "AJdQG3y5TvY", project: "Vestido Infantil Flores", part: 2 },
    
    // Saia Carneiros (2 partes)
    { id: 190, title: "Saia Carneiros - Parte 1", videoId: "v0GFZx3i5Dc", project: "Saia Carneiros", part: 1 },
    { id: 191, title: "Saia Carneiros - Parte 2", videoId: "rD06l4x5ot8", project: "Saia Carneiros", part: 2 },
    
    // Saída Sienna (4 partes)
    { id: 192, title: "Saída Sienna - Parte 1", videoId: "Q8_o19q7qkU", project: "Saída Sienna", part: 1 },
    { id: 193, title: "Saída Sienna - Parte 2", videoId: "v3KPfjM4rEU", project: "Saída Sienna", part: 2 },
    { id: 194, title: "Saída Sienna - Parte 3", videoId: "bzHs1bktTvs", project: "Saída Sienna", part: 3 },
    { id: 195, title: "Saída Sienna - Parte 4", videoId: "7UznYE_-Wjg", project: "Saída Sienna", part: 4 },
    
    // Vestido Celina (5 partes)
    { id: 196, title: "Vestido Celina - Parte 1", videoId: "2_LZiUijbcA", project: "Vestido Celina", part: 1 },
    { id: 197, title: "Vestido Celina - Parte 2", videoId: "tEFQR4v2lnU", project: "Vestido Celina", part: 2 },
    { id: 198, title: "Vestido Celina - Parte 3", videoId: "oGlf3rqwawI", project: "Vestido Celina", part: 3 },
    { id: 199, title: "Vestido Celina - Parte 4", videoId: "DDWCV3SPwLg", project: "Vestido Celina", part: 4 },
    { id: 200, title: "Vestido Celina - Parte 5", videoId: "tUrgpZiCJ90", project: "Vestido Celina", part: 5 },
    
    // Vestido Eduarda (4 partes)
    { id: 201, title: "Vestido Eduarda - Parte 1", videoId: "eo1Kr1DoOOo", project: "Vestido Eduarda", part: 1 },
    { id: 202, title: "Vestido Eduarda - Parte 2", videoId: "hTR7y32XKDY", project: "Vestido Eduarda", part: 2 },
    { id: 203, title: "Vestido Eduarda - Parte 3", videoId: "w_3fDMHVzhM", project: "Vestido Eduarda", part: 3 },
    { id: 204, title: "Vestido Eduarda - Parte 4", videoId: "Hi82e-EDTdg", project: "Vestido Eduarda", part: 4 },
    
    // Saída Dani (3 partes)
    { id: 205, title: "Saída Dani - Parte 1", videoId: "B4xhTJY_UyQ", project: "Saída Dani", part: 1 },
    { id: 206, title: "Saída Dani - Parte 2", videoId: "HQVLjo9_3sY", project: "Saída Dani", part: 2 },
    { id: 207, title: "Saída Dani - Parte 3", videoId: "wSuQxShxzNE", project: "Saída Dani", part: 3 },
    
    // Vestido Lollita (2 partes)
    { id: 208, title: "Vestido Lollita - Parte 1", videoId: "UtJlwdEklYQ", project: "Vestido Lollita", part: 1 },
    { id: 209, title: "Vestido Lollita - Parte 2", videoId: "l-MqIYIpOsM", project: "Vestido Lollita", part: 2 },
    
    // Vestido Barbados (3 partes)
    { id: 210, title: "Vestido Barbados - Parte 1", videoId: "KNH0RHLCb0s", project: "Vestido Barbados", part: 1 },
    { id: 211, title: "Vestido Barbados - Parte 2", videoId: "ZqRrV1-VW3A", project: "Vestido Barbados", part: 2 },
    { id: 212, title: "Vestido Barbados - Parte 3", videoId: "GSe98LWFD6I", project: "Vestido Barbados", part: 3 },
    
    // Batinha Chloe
    { id: 213, title: "Batinha Chloe", videoId: "a0nk3GoNm2Y", project: "Batinha Chloe", part: null },
    
    // Vestido Cecilia (7 partes)
    { id: 214, title: "Vestido Cecilia - Parte 1", videoId: "oPu4Z0IE3wY", project: "Vestido Cecilia", part: 1 },
    { id: 215, title: "Vestido Cecilia - Parte 2", videoId: "d5Tm8u7pwv8", project: "Vestido Cecilia", part: 2 },
    { id: 216, title: "Vestido Cecilia - Parte 3", videoId: "Wyp8Kpc_wks", project: "Vestido Cecilia", part: 3 },
    { id: 217, title: "Vestido Cecilia - Parte 4", videoId: "jteLa2xCVak", project: "Vestido Cecilia", part: 4 },
    { id: 218, title: "Vestido Cecilia - Parte 5", videoId: "iz3BFH14d-E", project: "Vestido Cecilia", part: 5 },
    { id: 219, title: "Vestido Cecilia - Parte 6", videoId: "S2O4ilYCOyA", project: "Vestido Cecilia", part: 6 },
    { id: 220, title: "Vestido Cecilia - Parte 7", videoId: "JSoJ5DIrqzE", project: "Vestido Cecilia", part: 7 },
    
    // Batinha Zoe
    { id: 221, title: "Batinha Zoe", videoId: "Y2pzWhLOPJE", project: "Batinha Zoe", part: null },
    
    // Biquíni Chalay (3 partes)
    { id: 222, title: "Biquíni Chalay - Parte 1", videoId: "TwqdE0XrQtw", project: "Biquíni Chalay", part: 1 },
    { id: 223, title: "Biquíni Chalay - Parte 2", videoId: "udU0xbBdy6A", project: "Biquíni Chalay", part: 2 },
    { id: 224, title: "Biquíni Chalay - Parte 3", videoId: "FhpLEq1oOW0", project: "Biquíni Chalay", part: 3 },
    
    // Vestido Ester (2 partes)
    { id: 225, title: "Vestido Ester - Parte 1", videoId: "aqVH4grJm-s", project: "Vestido Ester", part: 1 },
    { id: 226, title: "Vestido Ester - Parte 2", videoId: "DLtHowmmx5c", project: "Vestido Ester", part: 2 },
    
    // Bolsa Coral
    { id: 227, title: "Bolsa Coral", videoId: "dLiiKJD8PIc", project: "Bolsa Coral", part: null },
    
    // Conjunto Beatriz (3 partes)
    { id: 228, title: "Conjunto Beatriz - Parte 1", videoId: "sAVpo6GMWkY", project: "Conjunto Beatriz", part: 1 },
    { id: 229, title: "Conjunto Beatriz - Parte 2", videoId: "5rpkorXexRM", project: "Conjunto Beatriz", part: 2 },
    { id: 230, title: "Conjunto Beatriz - Parte 3", videoId: "KrbdPy8Ngjw", project: "Conjunto Beatriz", part: 3 },
    
    // Vestido Raquel (3 partes)
    { id: 231, title: "Vestido Raquel - Parte 1", videoId: "9cPmHxYPu_4", project: "Vestido Raquel", part: 1 },
    { id: 232, title: "Vestido Raquel - Parte 2", videoId: "Y6EjggUaPDI", project: "Vestido Raquel", part: 2 },
    { id: 233, title: "Vestido Raquel - Parte 3", videoId: "LAKfdeZ-uvw", project: "Vestido Raquel", part: 3 },
    
    // Conjunto Mia (2 partes)
    { id: 234, title: "Conjunto Mia - Parte 1", videoId: "JjrbPHVsB9c", project: "Conjunto Mia", part: 1 },
    { id: 235, title: "Conjunto Mia - Parte 2", videoId: "sahh4NQgAbE", project: "Conjunto Mia", part: 2 },
    
    // Vestido Celeste (4 partes)
    { id: 236, title: "Vestido Celeste - Parte 1", videoId: "knZxZwuhfNk", project: "Vestido Celeste", part: 1 },
    { id: 237, title: "Vestido Celeste - Parte 2", videoId: "mEq1bWNCW9Q", project: "Vestido Celeste", part: 2 },
    { id: 238, title: "Vestido Celeste - Parte 3", videoId: "BGEOGV6gz74", project: "Vestido Celeste", part: 3 },
    { id: 239, title: "Vestido Celeste - Parte 4", videoId: "k-d8mWx5j6o", project: "Vestido Celeste", part: 4 },
  ];

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
      // Ao clicar "Próximo" vindo do carrossel, vai para o primeiro vídeo
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
            {/* Mobile: Video player mais proeminente */}
            <div className="animate-fade-in">
              <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
                <CustomVideoPlayer
                  videoId={currentVideo.videoId}
                  title={currentVideo.title}
                  platform="youtube"
                  showPixMessage={currentVideo.id > 43}
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

          {/* Lista de Vídeos - Aparece segundo no mobile, sidebar no desktop */}
          <div className="lg:col-span-1 lg:row-span-2">
            <Card className="lg:sticky lg:top-8 shadow-card animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Todas as Aulas (230)
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
                          thumbnail={getVideoThumbnail(video.videoId)}
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

          {/* Sobre esta Aula - Aparece por último no mobile */}
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
                
                {/* Visualização do Projeto - Thumbnail como Resultado Final */}
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
                          src={getVideoThumbnail(currentVideo.videoId)} 
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
