import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFavorites } from "@/hooks/use-favorites";

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
  // Vestido Longo de Crochê (1, 2, 3)
  "1165908032?h=4e8257a515": "/thumbnails/ozGPS_H5J44-HD.jpg",
  "1165906778?h=ca85d54254": "/thumbnails/ozGPS_H5J44-HD.jpg",
  "1165907172?h=5916a23185": "/thumbnails/ozGPS_H5J44-HD.jpg",
  // Vestido Decote V
  "1165903186?h=bb7c0e0908": "/thumbnails/ozGPS_H5J44-HD.jpg",
  // Vestido Raquel
  "1165877185?h=ce49de91b5": "/thumbnails/VEERDE VERTICAL (1).png",
  // Saída Renata
  "1165899950?h=65fb9d0fc3": "/thumbnails/renata.jpg",
  // Vestido Ciganinha
  "1165905541?h=441d91f0bc": "/thumbnails/ra2ZISYUD0c-HD.jpg",
  // Vestido Luxo
  "1165412197?h=0fa29c051a": "/thumbnails/_EEt2dLuozA-SD.jpg",
  // Vestido Cleópatra
  "1165896182?h=2ff4b53004": "/thumbnails/Ia19Yf-H08g-HD.jpg",
  // Conjunto Rosas
  "1165896656?h=71c1d6054e": "/thumbnails/conjunto rosas.jpg",
  // Top Estrela Brasil
  "1165908076?h=3b842fbf9d": "/thumbnails/S-Vp3QiN1Tk-HD.jpg",
  // Conjunto Square
  "1165896871?h=f4895dbef0": "/thumbnails/Square.jpg",
  // Vestido Sereia
  "1165908266?h=61b6de8549": "/thumbnails/Sereia.jpg",
  // Vestido Ana Clara
  "1165898325?h=5af0c2457f": "/thumbnails/ana clara.jpg",
  // Vestido Camila
  "1165897115?h=2e6bdf5c09": "/thumbnails/vestido camila.jpg",
  // Vestido Concha
  "1165897327?h=bf84e16cb9": "/thumbnails/Conchas.jpg",
  // Vestido Darlene
  "1165907603?h=bccb08fbbc": "/thumbnails/darlene.jpg",
  // Vestido Crochê Saída
  "1165897423?h=6d46bec5f5": "/thumbnails/Vestido Crochê Saida.jpg",
  // Vestido Evelyne
  "1165897740?h=21a8c932d8": "/thumbnails/Evelyne.jpg",
  // Vestido Flávia
  "1165897922?h=83924a6988": "/thumbnails/Vestido Flavia.jpg",
  // Vestido Noiva Longo
  "1165417274?h=8e8af3b41e": "/thumbnails/Longo Noiva.jpg",
  // Vestido Moçambique
  "1165898928?h=ce0edc64ab": "/thumbnails/moçambique.jpg",
  // Sousplato Girafa
  "1165898764?h=290f75b513": "/thumbnails/sousplate.jpg",
  // Saída Tereza
  "1165899713?h=063db9139d": "/thumbnails/tereza.jpg",
  // Saída Betânia
  "1165900227?h=ab8c1eb8e3": "/thumbnails/betania.jpg",
  // Saída Mídi
  "1165900453?h=3a7d240268": "/thumbnails/saia midi.png",
  // Cropped Garden
  "1165900701?h=fc8686d056": "/thumbnails/Gardeen.jpg",
  // Corset de Crochê
  "1165900912?h=25ab81c66e": "/thumbnails/corset de croche.jpg",
  // Corset Angel
  "1165901257?h=ba7889f004": "/thumbnails/corset angel.jpg",
  // Corset em V
  "1165901491?h=5bf59bc49e": "/thumbnails/corset em v.jpg",
  // Conjunto Tereza
  "1165901832?h=5c0b941af2": "/thumbnails/Conjunto Tereeza.jpg",
  // Conjunto Tardezinha
  "1165902033?h=67a0e24c41": "/thumbnails/tardezinha.jpg",
  // Conjunto de Crochê Brilho
  "1165902686?h=192b4mb0cb": "/thumbnails/conjunto brilho.jpg",
  // Conjunto Praiana
  "1165902854?h=c106849f13": "/thumbnails/Praiana.jpg",
  // Conjunto Camila
  "1165905050?h=ddfb626d58": "/thumbnails/camila.jpg",
  // Calça Thais
  "1165905314?h=0abf93f051": "/thumbnails/calça thais.jpg",
  // Saída Brasil
  "1165908138?h=11ec544581": "/thumbnails/DxUeSn4p-Rg-HD.jpg",
  // Biquíni Tomara que Caia
  "1165416602?h=239fa20e43": "/thumbnails/vrCyt1O4SjU-HD.jpg",
  // Top Brasil
  "1165908193?h=44ce060d5e": "/thumbnails/IRnqSP9VCsg-HD.jpg",

  // === VIMEO THUMBNAILS (Página 2+) ===
  // Vestido Virginia
  "1165822436?h=73db5fd949": "/thumbnails/VESTIDO VIRGINIA.png",
  "1165822491?h=426a5c76b5": "/thumbnails/VESTIDO VIRGINIA.png",
  // Vestido Angel
  "1165822536?h=494836d768": "/thumbnails/VESTIDO ANGEL.png",
  "1165822336?h=b2524c1a00": "/thumbnails/VESTIDO ANGEL.png",
  "1165822633?h=9a932be1b8": "/thumbnails/VESTIDO ANGEL.png",
  // Saída Mel Maia
  "1165822238?h=798063ee5e": "/thumbnails/SAIDA MEL MAIA.png",
  "1165822696?h=58d1366209": "/thumbnails/SAIDA MEL MAIA.png",
  // Conjunto Franja
  "1165823586?h=95ae5df629": "/thumbnails/CONJUNTO FRANJAS.png",
  "1165823379?h=de1eeffff5": "/thumbnails/CONJUNTO FRANJAS.png",
  // Vestido Maria
  "1165822301?h=88af25dec4": "/thumbnails/VESTIDO MARIA.png",
  "1165822154?h=5ec6b1f8af": "/thumbnails/VESTIDO MARIA.png",
  "1165822389?h=7d4dceda8d": "/thumbnails/VESTIDO MARIA.png",
  // Cropped Duda
  "1165825953?h=b67785daa5": "/thumbnails/CROPPED DUDA.png",
  // Vestido Nala
  "1165828828?h=a4c932ccd4": "/thumbnails/VESTIDO NALA.png",
  "1165829077?h=2e1fffbb63": "/thumbnails/VESTIDO NALA.png",
  // Cropped Lola
  "1165828668?h=95dd4603c4": "/thumbnails/CROPPED LOLA.png",
  // Vestido Ana Paula
  "1165825235?h=e65562ca75": "/thumbnails/VESTIDO ANA PAULA.png",
  "1165825126?h=78b247f600": "/thumbnails/VESTIDO ANA PAULA.png",
  "1165825817?h=a8a15760a4": "/thumbnails/VESTIDO ANA PAULA.png",
  // Vestido Sophia
  "1165826517?h=288eec92f1": "/thumbnails/VESTIDO SOPHIA.png",
  // Vestido Juliana Paes
  "1165823703?h=f2563c95af": "/thumbnails/VESTIDO JULIANA PAES.png",
  "1165823637?h=be2694c569": "/thumbnails/VESTIDO JULIANA PAES.png",
  "1165823010?h=773cd6f91e": "/thumbnails/VESTIDO JULIANA PAES.png",
  "1165824039?h=b270eff1a3": "/thumbnails/VESTIDO JULIANA PAES.png",
  // Conjunto Cali
  "1165828774?h=0add065419": "/thumbnails/CONJJUNTO CALI.png",
  "1165828605?h=58d11062d4": "/thumbnails/CONJJUNTO CALI.png",
  "1165828438?h=456ae1cdb5": "/thumbnails/CONJJUNTO CALI.png",
  "1165828229?h=4acb08a378": "/thumbnails/CONJJUNTO CALI.png",
  // Vestido Moana
  "1165826035?h=8dbfaef2b0": "/thumbnails/VESTIDO MOANA.png",
  // Vestido Larissa
  "1165829701?h=c3dde6b38a": "/thumbnails/VESTIDO LARISSA.png",
  "1165829124?h=f7f7193ac1": "/thumbnails/VESTIDO LARISSA.png",
  "1165829571?h=8d15bdff7a": "/thumbnails/VESTIDO LARISSA.png",
  // Calça Correntinha
  "1165823422?h=3bad21440c": "/thumbnails/CALÇA CORRENTINHA.png",
  // Vestido Vanessa
  "1165827065?h=0540e2af34": "/thumbnails/VESTIDO VANESSA.png",
  "1165826296?h=8c5f4f7cfb": "/thumbnails/VESTIDO VANESSA.png",
  "1165826387?h=9cf52087de": "/thumbnails/VESTIDO VANESSA.png",
  // Conjunto Lore
  "1165827131?h=c55fa2bddb": "/thumbnails/VESTIDO LORE.png",
  "1165827332?h=75278547ee": "/thumbnails/VESTIDO LORE.png",
  "1165824975?h=29ac896d60": "/thumbnails/VESTIDO LORE.png",
  // Saia Laura
  "1165823777?h=2148619f8b": "/thumbnails/SAIA LAURA.png",
  // Vestido Bel
  "1165826717?h=fd78660abf": "/thumbnails/VESTIDO BEL.png",
  "1165826152?h=d563f325dc": "/thumbnails/VESTIDO BEL.png",
  // Conjunto Gabi
  "1165823492?h=049b68c02a": "/thumbnails/CONJUNTO GABI.png",
  "1165823953?h=6133197ea0": "/thumbnails/CONJUNTO GABI.png",
  "1165823551?h=e845f3f59b": "/thumbnails/CONJUNTO GABI.png",
  // Macacão Grassi
  "1165828975?h=b2f003a62f": "/thumbnails/MACACÃO GRASSI.png",
  "1165829345?h=67f801752d": "/thumbnails/MACACÃO GRASSI.png",
  // Calça Tela
  "1165823210?h=b5372b698b": "/thumbnails/CALÇA TELA.png",
  // Vestido Yara
  "1165825327?h=6fcce5e502": "/thumbnails/VESTIDO YARA.png",
  "1165825757?h=00739caa67": "/thumbnails/VESTIDO YARA.png",
  // Conjunto com Paetê Acrílico
  "1165823127?h=80846c06c2": "/thumbnails/CONJUNTO PAETE.png",
  // Cropped Ana Clara
  "1165823296?h=588db44c04": "/thumbnails/CROPPED ANNA CLARA.png",
  // Vestido Vanda
  "1165826807?h=56f86f1de4": "/thumbnails/VESTIDO VANDA.png",
  // Suéter Sofia
  "1165829840?h=bda1e8e5be": "/thumbnails/SUÉTER SOFIA.png",
  "1165828330?h=b9b9868fd2": "/thumbnails/SUÉTER SOFIA.png",
  // Vestido Patricia
  "1165823890?h=8a3a44f1d3": "/thumbnails/VESTIDO PATRICIA.png",
  "1165823819?h=d5bbc1ab0f": "/thumbnails/VESTIDO PATRICIA.png",
  // Conjunto Lisi
  "1165825489?h=4953414a7c": "/thumbnails/CONJUNTO LISI.png",
  "1165825673?h=fb8f804677": "/thumbnails/CONJUNTO LISI.png",
  // Biquíni Eva
  "1165826908?h=cf3b0678ab": "/thumbnails/BIQUINI EVA.png",
  // Saia Amanda
  "1165826996?h=639389fcf0": "/thumbnails/SAIA AMANDA.png",
  // Saia Nina
  "1165825423?h=8cfc5ddc23": "/thumbnails/SAIA NINA.png",
  // Vestido Ana
  "1165825582?h=f833fa35d1": "/thumbnails/VESTIDO ANA.png",
  // Vestido Marina
  "1165826240?h=bb6309f319": "/thumbnails/VESTIDO MARINA.png",
  "1165825869?h=8858cf55a6": "/thumbnails/VESTIDO MARINA.png",
  // Conjunto Letícia
  "1165867234?h=6e2eed84e2": "/thumbnails/CONJUNTO LETICIA.png",

  // === Vestido Patricia Poeta ===
  "1166455223": "/thumbnails/ROSA VERTICAL (1).png",
  "1166455407": "/thumbnails/ROSA VERTICAL (1).png",
  "1166455304": "/thumbnails/ROSA VERTICAL (1).png",
  // Conjunto Zelly
  "1166455028": "/thumbnails/DOURADO QUADRADO (1).png",
  "1166455627": "/thumbnails/DOURADO QUADRADO (1).png",
  "1166455708": "/thumbnails/DOURADO QUADRADO (1).png",
  // Vestido Alice
  "1166454267": "/thumbnails/DOURADO QUADRADO (2).png",
  "1166454162": "/thumbnails/DOURADO QUADRADO (2).png",
  // Conjunto Renata
  "1166454958": "/thumbnails/CONJUNTO RENATA.png",
  "1166454814": "/thumbnails/CONJUNTO RENATA.png",
  // Vestido Lari
  "1166454494": "/thumbnails/DOURADO QUADRADO (3).png",
  "1166454409": "/thumbnails/DOURADO QUADRADO (3).png",
  "1166454722": "/thumbnails/DOURADO QUADRADO (3).png",
  // Vestido Nay
  "1166454610": "/thumbnails/VERDE QUADRADO (1).png",
  "1166454887": "/thumbnails/VERDE QUADRADO (1).png",
  // Conjunto Íris
  "1166453580": "/thumbnails/CONJUNTO RENATA (1).png",
  "1166453263": "/thumbnails/CONJUNTO RENATA (1).png",
  // Conjunto Salles
  "1166454066": "/thumbnails/DOURADO QUADRADO (4).png",
  "1166453471": "/thumbnails/DOURADO QUADRADO (4).png",
  "1166453995": "/thumbnails/DOURADO QUADRADO (4).png",
  // Conjunto Scheila
  "1166453825": "/thumbnails/CONJUNTO RENATA (2).png",
  "1166453931": "/thumbnails/CONJUNTO RENATA (2).png",
  // Cropped Anitta
  "1166452434": "/thumbnails/DOURADO QUADRADO (5).png",
  // Cropped Maré
  "1166452773": "/thumbnails/CONJUNTO RENATA (3).png",
  // Vestido Estrella
  "1166452653": "/thumbnails/CONJUNTO RENATA (4).png",
  "1166453163": "/thumbnails/CONJUNTO RENATA (4).png",
  // Vestido Lore (4 partes)
  "1166452912": "/thumbnails/VESTIDO LORE.png",
  "1166452540": "/thumbnails/VESTIDO LORE.png",
  "1166453001": "/thumbnails/VESTIDO LORE.png",
  "1166453073": "/thumbnails/VESTIDO LORE.png",
  // Vestido Lorena
  "1166451621": "/thumbnails/lore.jpg",
  "1166451567": "/thumbnails/lore.jpg",
  "1166451424": "/thumbnails/lore.jpg",
  "1166451198": "/thumbnails/lore.jpg",
  "1166451470": "/thumbnails/lore.jpg",
  // Vestido Sol
  "1166451054": "/thumbnails/VEERDE VERTICAL.png",
  "1166451321": "/thumbnails/VEERDE VERTICAL.png",
  "1166451140": "/thumbnails/VEERDE VERTICAL.png",
  // Cropped Tati
  "1166456612": "/thumbnails/VERDE QUADRADO.png",
  // Vestido Dubai
  "1166456435": "/thumbnails/ROSA VERTICAL.png",
  // Vestido Laís
  "1166456340": "/thumbnails/DOURADO VERTICAL.png",
  "1166456535": "/thumbnails/DOURADO VERTICAL.png",
  "1166456240": "/thumbnails/DOURADO VERTICAL.png",
  // Vestido Abacaxi
  "1166450255": "/thumbnails/CONJUNTO RENATA (9).png",
  "1166450136": "/thumbnails/CONJUNTO RENATA (9).png",
  // Vestido Bella
  "1166450761": "/thumbnails/CONJUNTO RENATA (10).png",
  "1166450392": "/thumbnails/CONJUNTO RENATA (10).png",
  "1166450675": "/thumbnails/CONJUNTO RENATA (10).png",
  // Vestido e Cropped Julia
  "1166450034": "/thumbnails/VERDE QUADRADO (2).png",
  "1166456882": "/thumbnails/VERDE QUADRADO (2).png",
  // Vestido Brunnet
  "1166456663": "/thumbnails/CONJUNTO RENATA (11).png",
  "1166450509": "/thumbnails/CONJUNTO RENATA (11).png",
  "1166450892": "/thumbnails/CONJUNTO RENATA (11).png",
  // Conjunto Tamiris
  "1166455789": "/thumbnails/VERDE QUADRADO (3).png",
  "1166456097": "/thumbnails/VERDE QUADRADO (3).png",
  // Cropped Amari
  "1166456178": "/thumbnails/VERDE QUADRADO (4).png",
  // Vestido Gaia
  "1166452269": "/thumbnails/CONJUNTO RENATA (6).png",
  "1166452022": "/thumbnails/CONJUNTO RENATA (6).png",
  // Vestido Yasmin
  "1166451870": "/thumbnails/CONJUNTO RENATA (7).png",
  "1166452191": "/thumbnails/CONJUNTO RENATA (7).png",
  "1166451669": "/thumbnails/CONJUNTO RENATA (7).png",
  // Conjunto Suri
  "1166451943": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166452358": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166451783": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166452111": "/thumbnails/DOURADO QUADRADO (8).png",
  // Cropped Angel
  "1166453227": "/thumbnails/DOURADO QUADRADO (7).png",
  // Cropped Livia
  "1166455527": "/thumbnails/DOURADO QUADRADO (6).png",
  // Saida Shirley
  "1165908374?h=954ee77336": "/thumbnails/XReZUJvzft0-HD.jpg",
  // Vestido Raira
  "1165899486?h=7759bd5d46": "/thumbnails/CONJUNTO RENATA (5).png",
  // Saída Rayssa
  "1166450959": "/thumbnails/CONJUNTO RENATA (8).png",
  "1166451252": "/thumbnails/CONJUNTO RENATA (8).png",
};

const getVideoThumbnail = (videoId: string, platform?: string) => {
  if (customThumbnails[videoId]) return customThumbnails[videoId];
  if (platform === "vimeo") return `https://vumbnail.com/${videoId.split('?')[0]}.jpg`;
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const VestidosCroche = () => {
  const videos_raw = [
    // ===== VESTIDOS (exclusivos do módulo) =====
    // ===== PÁGINA 1 (1-20) =====
    { id: 1, title: "Vestido Longo de Crochê", videoId: "1165908032?h=4e8257a515", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 2, title: "Vestido Longo de Crochê 2", videoId: "1165906778?h=ca85d54254", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 3, title: "Vestido Longo de Crochê 3", videoId: "1165907172?h=5916a23185", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 4, title: "Vestido Decote V", videoId: "1165903186?h=bb7c0e0908", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 5, title: "Vestido Raquel", videoId: "1165877185?h=ce49de91b5", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 7, title: "Vestido Ciganinha", videoId: "1165905541?h=441d91f0bc", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 7, title: "Vestido Luxo", videoId: "1165412197?h=0fa29c051a", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 8, title: "Vestido Cleópatra", videoId: "1165896182?h=2ff4b53004", project: "Destaque", part: null, platform: "vimeo" as const },
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
    { id: 21, title: "Vestido Sereia", videoId: "1165908266?h=61b6de8549", project: "Vestido Sereia", part: null, platform: "vimeo" as const },
    // ===== PÁGINA 2+ (21+): Ordem específica no início, depois embaralhados =====
    // Vestido Maria no começo da página 2
    { id: 21, title: "Vestido Maria - Parte 1", videoId: "1165822301?h=88af25dec4", project: "Vestido Maria", part: 1, platform: "vimeo" as const },
    { id: 22, title: "Vestido Maria - Parte 2", videoId: "1165822154?h=5ec6b1f8af", project: "Vestido Maria", part: 2, platform: "vimeo" as const },
    { id: 23, title: "Vestido Maria - Parte 3", videoId: "1165822389?h=7d4dceda8d", project: "Vestido Maria", part: 3, platform: "vimeo" as const },
    // Vestido Nala logo abaixo
    { id: 25, title: "Vestido Nala - Parte 1", videoId: "1165828828?h=a4c932ccd4", project: "Vestido Nala", part: 1, platform: "vimeo" as const },
    { id: 26, title: "Vestido Nala - Parte 2", videoId: "1165829077?h=2e1fffbb63", project: "Vestido Nala", part: 2, platform: "vimeo" as const },
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
    { id: 40, title: "Vestido Moana", videoId: "1165826035?h=8dbfaef2b0", project: "Vestido Moana", part: null, platform: "vimeo" as const },
    { id: 41, title: "Vestido Larissa - Parte 1", videoId: "1165829701?h=c3dde6b38a", project: "Vestido Larissa", part: 1, platform: "vimeo" as const },
    { id: 42, title: "Vestido Larissa - Parte 2", videoId: "1165829124?h=f7f7193ac1", project: "Vestido Larissa", part: 2, platform: "vimeo" as const },
    { id: 43, title: "Vestido Larissa - Parte 3", videoId: "1165829571?h=8d15bdff7a", project: "Vestido Larissa", part: 3, platform: "vimeo" as const },
    { id: 45, title: "Vestido Vanessa - Parte 1", videoId: "1165827065?h=0540e2af34", project: "Vestido Vanessa", part: 1, platform: "vimeo" as const },
    { id: 46, title: "Vestido Vanessa - Parte 2", videoId: "1165826296?h=8c5f4f7cfb", project: "Vestido Vanessa", part: 2, platform: "vimeo" as const },
    { id: 47, title: "Vestido Vanessa - Parte 3", videoId: "1165826387?h=9cf52087de", project: "Vestido Vanessa", part: 3, platform: "vimeo" as const },
    { id: 52, title: "Vestido Bel - Parte 1", videoId: "1165826717?h=fd78660abf", project: "Vestido Bel", part: 1, platform: "vimeo" as const },
    { id: 53, title: "Vestido Bel - Parte 2", videoId: "1165826152?h=d563f325dc", project: "Vestido Bel", part: 2, platform: "vimeo" as const },
    { id: 60, title: "Vestido Yara - Parte 1", videoId: "1165825327?h=6fcce5e502", project: "Vestido Yara", part: 1, platform: "vimeo" as const },
    { id: 61, title: "Vestido Yara - Parte 2", videoId: "1165825757?h=00739caa67", project: "Vestido Yara", part: 2, platform: "vimeo" as const },
    { id: 64, title: "Vestido Vanda", videoId: "1165826807?h=56f86f1de4", project: "Vestido Vanda", part: null, platform: "vimeo" as const },
    { id: 67, title: "Vestido Patricia - Parte 1", videoId: "1165823890?h=8a3a44f1d3", project: "Vestido Patricia", part: 1, platform: "vimeo" as const },
    { id: 68, title: "Vestido Patricia - Parte 2", videoId: "1165823819?h=d5bbc1ab0f", project: "Vestido Patricia", part: 2, platform: "vimeo" as const },
    { id: 74, title: "Vestido Ana", videoId: "1165825582?h=f833fa35d1", project: "Vestido Ana", part: null, platform: "vimeo" as const },
    { id: 75, title: "Vestido Marina - Parte 1", videoId: "1165826240?h=bb6309f319", project: "Vestido Marina", part: 1, platform: "vimeo" as const },
    { id: 76, title: "Vestido Marina - Parte 2", videoId: "1165825869?h=8858cf55a6", project: "Vestido Marina", part: 2, platform: "vimeo" as const },
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
    // ===== 110+: VÍDEOS ANTIGOS COM PIX (YouTube) =====
    
    // Vestido Patricia Poeta (3 partes)
    { id: 111, title: "Vestido Patricia Poeta - Parte 1", videoId: "1166455223", project: "Vestido Patricia Poeta", part: 1, platform: "vimeo" as const },
    { id: 112, title: "Vestido Patricia Poeta - Parte 2", videoId: "1166455407", project: "Vestido Patricia Poeta", part: 2, platform: "vimeo" as const },
    { id: 113, title: "Vestido Patricia Poeta - Parte 3", videoId: "1166455304", project: "Vestido Patricia Poeta", part: 3, platform: "vimeo" as const },
    // Vestido Alice (2 partes)
    { id: 118, title: "Vestido Alice - Parte 1", videoId: "1166454267", project: "Vestido Alice", part: 1, platform: "vimeo" as const },
    { id: 119, title: "Vestido Alice - Parte 2", videoId: "1166454162", project: "Vestido Alice", part: 2, platform: "vimeo" as const },
    // Vestido Lari (3 partes)
    { id: 123, title: "Vestido Lari - Parte 1", videoId: "1166454494", project: "Vestido Lari", part: 1, platform: "vimeo" as const },
    { id: 124, title: "Vestido Lari - Parte 2", videoId: "1166454409", project: "Vestido Lari", part: 2, platform: "vimeo" as const },
    { id: 125, title: "Vestido Lari - Parte 3", videoId: "1166454722", project: "Vestido Lari", part: 3, platform: "vimeo" as const },
    // Vestido Nay (2 partes)
    { id: 126, title: "Vestido Nay - Parte 1", videoId: "1166454610", project: "Vestido Nay", part: 1, platform: "vimeo" as const },
    { id: 127, title: "Vestido Nay - Parte 2", videoId: "1166454887", project: "Vestido Nay", part: 2, platform: "vimeo" as const },
    // Vestido Estrella (2 partes)
    { id: 139, title: "Vestido Estrella - Parte 1", videoId: "1166452653", project: "Vestido Estrella", part: 1, platform: "vimeo" as const },
    { id: 140, title: "Vestido Estrella - Parte 2", videoId: "1166453163", project: "Vestido Estrella", part: 2, platform: "vimeo" as const },
    // Vestido Lore (4 partes)
    { id: 141, title: "Vestido Lore - Parte 1", videoId: "1166452912", project: "Vestido Lore", part: 1, platform: "vimeo" as const },
    { id: 142, title: "Vestido Lore - Parte 2", videoId: "1166452540", project: "Vestido Lore", part: 2, platform: "vimeo" as const },
    { id: 143, title: "Vestido Lore - Parte 3", videoId: "1166453001", project: "Vestido Lore", part: 3, platform: "vimeo" as const },
    { id: 144, title: "Vestido Lore - Parte 4", videoId: "1166453073", project: "Vestido Lore", part: 4, platform: "vimeo" as const },
    // Vestido Gaia (2 partes)
    { id: 145, title: "Vestido Gaia - Parte 1", videoId: "1166452269", project: "Vestido Gaia", part: 1, platform: "vimeo" as const },
    { id: 146, title: "Vestido Gaia - Parte 2", videoId: "1166452022", project: "Vestido Gaia", part: 2, platform: "vimeo" as const },
    // Vestido Yasmin (3 partes)
    { id: 147, title: "Vestido Yasmin - Parte 1", videoId: "1166451870", project: "Vestido Yasmin", part: 1, platform: "vimeo" as const },
    { id: 148, title: "Vestido Yasmin - Parte 2", videoId: "1166452191", project: "Vestido Yasmin", part: 2, platform: "vimeo" as const },
    { id: 149, title: "Vestido Yasmin - Parte 3", videoId: "1166451669", project: "Vestido Yasmin", part: 3, platform: "vimeo" as const },
    // Vestido Lorena (5 partes)
    { id: 154, title: "Vestido Lorena - Parte 1", videoId: "1166451621", project: "Vestido Lorena", part: 1, platform: "vimeo" as const },
    { id: 155, title: "Vestido Lorena - Parte 2", videoId: "1166451567", project: "Vestido Lorena", part: 2, platform: "vimeo" as const },
    { id: 156, title: "Vestido Lorena - Parte 3", videoId: "1166451424", project: "Vestido Lorena", part: 3, platform: "vimeo" as const },
    { id: 157, title: "Vestido Lorena - Parte 4", videoId: "1166451198", project: "Vestido Lorena", part: 4, platform: "vimeo" as const },
    { id: 158, title: "Vestido Lorena - Parte 5", videoId: "1166451470", project: "Vestido Lorena", part: 5, platform: "vimeo" as const },
    // Saída Rayssa (2 partes)
    { id: 159, title: "Saída Rayssa - Parte 1", videoId: "1166450959", project: "Saída Rayssa", part: 1, platform: "vimeo" as const },
    { id: 160, title: "Saída Rayssa - Parte 2", videoId: "1166451252", project: "Saída Rayssa", part: 2, platform: "vimeo" as const },
    // Vestido Sol (3 partes)
    { id: 161, title: "Vestido Sol - Parte 1", videoId: "1166451054", project: "Vestido Sol", part: 1, platform: "vimeo" as const },
    { id: 162, title: "Vestido Sol - Parte 2", videoId: "1166451321", project: "Vestido Sol", part: 2, platform: "vimeo" as const },
    { id: 163, title: "Vestido Sol - Parte 3", videoId: "1166451140", project: "Vestido Sol", part: 3, platform: "vimeo" as const },
    // Vestido Abacaxi (2 partes)
    { id: 164, title: "Vestido Abacaxi - Parte 1", videoId: "1166450255", project: "Vestido Abacaxi", part: 1, platform: "vimeo" as const },
    { id: 165, title: "Vestido Abacaxi - Parte 2", videoId: "1166450136", project: "Vestido Abacaxi", part: 2, platform: "vimeo" as const },
    // Vestido Bella (3 partes)
    { id: 166, title: "Vestido Bella - Parte 1", videoId: "1166450761", project: "Vestido Bella", part: 1, platform: "vimeo" as const },
    { id: 167, title: "Vestido Bella - Parte 2", videoId: "1166450392", project: "Vestido Bella", part: 2, platform: "vimeo" as const },
    { id: 168, title: "Vestido Bella - Parte 3", videoId: "1166450675", project: "Vestido Bella", part: 3, platform: "vimeo" as const },
    // Vestido e Cropped Julia (2 partes)
    { id: 169, title: "Vestido e Cropped Julia - Parte 1", videoId: "1166450034", project: "Vestido e Cropped Julia", part: 1, platform: "vimeo" as const },
    { id: 170, title: "Vestido e Cropped Julia - Parte 2", videoId: "1166456882", project: "Vestido e Cropped Julia", part: 2, platform: "vimeo" as const },
    // Vestido Brunnet (3 partes)
    { id: 171, title: "Vestido Brunnet - Parte 1", videoId: "1166456663", project: "Vestido Brunnet", part: 1, platform: "vimeo" as const },
    { id: 172, title: "Vestido Brunnet - Parte 2", videoId: "1166450509", project: "Vestido Brunnet", part: 2, platform: "vimeo" as const },
    { id: 173, title: "Vestido Brunnet - Parte 3", videoId: "1166450892", project: "Vestido Brunnet", part: 3, platform: "vimeo" as const },
    // Vestido Dubai
    { id: 178, title: "Vestido Dubai", videoId: "1166456435", project: "Vestido Dubai", part: null, platform: "vimeo" as const },
    // Vestido Laís (3 partes)
    { id: 179, title: "Vestido Laís - Parte 1", videoId: "1166456340", project: "Vestido Laís", part: 1, platform: "vimeo" as const },
    { id: 180, title: "Vestido Laís - Parte 2", videoId: "1166456535", project: "Vestido Laís", part: 2, platform: "vimeo" as const },
    { id: 181, title: "Vestido Laís - Parte 3", videoId: "1166456240", project: "Vestido Laís", part: 3, platform: "vimeo" as const },

    // ===== CROPPEDS, BIQUÍNIS, CONJUNTOS (também no módulo Croppeds) =====
    { id: 6, title: "Saída Renata", videoId: "1165899950?h=65fb9d0fc3", project: "Destaque", part: null, platform: "vimeo" as const },
    { id: 9, title: "Conjunto Rosas", videoId: "1165896656?h=71c1d6054e", project: "Conjunto Rosas", part: null, platform: "vimeo" as const },
    { id: 10, title: "Top Estrela Brasil", videoId: "1165908076?h=3b842fbf9d", project: "Top Estrela Brasil", part: null, platform: "vimeo" as const },
    // Conjunto Franja na página 1
    { id: 18, title: "Conjunto Franja - Parte 1", videoId: "1165823586?h=95ae5df629", project: "Conjunto Franja", part: 1, platform: "vimeo" as const },
    { id: 19, title: "Conjunto Franja - Parte 2", videoId: "1165823379?h=de1eeffff5", project: "Conjunto Franja", part: 2, platform: "vimeo" as const },
    { id: 20, title: "Conjunto Square", videoId: "1165896871?h=f4895dbef0", project: "Conjunto Square", part: null, platform: "vimeo" as const },
    // Cropped Duda logo abaixo
    { id: 24, title: "Cropped Duda", videoId: "1165825953?h=b67785daa5", project: "Cropped Duda", part: null, platform: "vimeo" as const },
    // Cropped Lola logo abaixo
    { id: 27, title: "Cropped Lola", videoId: "1165828668?h=95dd4603c4", project: "Cropped Lola", part: null, platform: "vimeo" as const },
    { id: 36, title: "Conjunto Cali - Parte 1", videoId: "1165828774?h=0add065419", project: "Conjunto Cali", part: 1, platform: "vimeo" as const },
    { id: 37, title: "Conjunto Cali - Parte 2", videoId: "1165828605?h=58d11062d4", project: "Conjunto Cali", part: 2, platform: "vimeo" as const },
    { id: 38, title: "Conjunto Cali - Parte 3", videoId: "1165828438?h=456ae1cdb5", project: "Conjunto Cali", part: 3, platform: "vimeo" as const },
    { id: 39, title: "Conjunto Cali - Parte 4", videoId: "1165828229?h=4acb08a378", project: "Conjunto Cali", part: 4, platform: "vimeo" as const },
    { id: 44, title: "Calça Correntinha", videoId: "1165823422?h=3bad21440c", project: "Calça Correntinha", part: null, platform: "vimeo" as const },
    { id: 48, title: "Conjunto Lore - Parte 1", videoId: "1165827131?h=c55fa2bddb", project: "Conjunto Lore", part: 1, platform: "vimeo" as const },
    { id: 49, title: "Conjunto Lore - Parte 2", videoId: "1165827332?h=75278547ee", project: "Conjunto Lore", part: 2, platform: "vimeo" as const },
    { id: 50, title: "Conjunto Lore - Parte 3", videoId: "1165824975?h=29ac896d60", project: "Conjunto Lore", part: 3, platform: "vimeo" as const },
    { id: 51, title: "Saia Laura", videoId: "1165823777?h=2148619f8b", project: "Saia Laura", part: null, platform: "vimeo" as const },
    { id: 54, title: "Conjunto Gabi - Parte 1", videoId: "1165823492?h=049b68c02a", project: "Conjunto Gabi", part: 1, platform: "vimeo" as const },
    { id: 55, title: "Conjunto Gabi - Parte 2", videoId: "1165823953?h=6133197ea0", project: "Conjunto Gabi", part: 2, platform: "vimeo" as const },
    { id: 56, title: "Conjunto Gabi - Dica Extra", videoId: "1165823551?h=e845f3f59b", project: "Conjunto Gabi", part: 3, platform: "vimeo" as const },
    { id: 57, title: "Macacão Grassi - Parte 1", videoId: "1165828975?h=b2f003a62f", project: "Macacão Grassi", part: 1, platform: "vimeo" as const },
    { id: 58, title: "Macacão Grassi - Parte 2", videoId: "1165829345?h=67f801752d", project: "Macacão Grassi", part: 2, platform: "vimeo" as const },
    { id: 59, title: "Calça Tela", videoId: "1165823210?h=b5372b698b", project: "Calça Tela", part: null, platform: "vimeo" as const },
    { id: 62, title: "Conjunto com Paetê Acrílico", videoId: "1165823127?h=80846c06c2", project: "Conjunto com Paetê Acrílico", part: null, platform: "vimeo" as const },
    { id: 63, title: "Cropped Ana Clara", videoId: "1165823296?h=588db44c04", project: "Cropped Ana Clara", part: null, platform: "vimeo" as const },
    { id: 65, title: "Suéter Sofia - Parte 1", videoId: "1165829840?h=bda1e8e5be", project: "Suéter Sofia", part: 1, platform: "vimeo" as const },
    { id: 66, title: "Suéter Sofia - Parte 2", videoId: "1165828330?h=b9b9868fd2", project: "Suéter Sofia", part: 2, platform: "vimeo" as const },
    { id: 69, title: "Conjunto Lisi - Parte 1", videoId: "1165825489?h=4953414a7c", project: "Conjunto Lisi", part: 1, platform: "vimeo" as const },
    { id: 70, title: "Conjunto Lisi - Parte 2", videoId: "1165825673?h=fb8f804677", project: "Conjunto Lisi", part: 2, platform: "vimeo" as const },
    { id: 71, title: "Biquíni Eva", videoId: "1165826908?h=cf3b0678ab", project: "Biquíni Eva", part: null, platform: "vimeo" as const },
    { id: 72, title: "Saia Amanda", videoId: "1165826996?h=639389fcf0", project: "Saia Amanda", part: null, platform: "vimeo" as const },
    { id: 73, title: "Saia Nina", videoId: "1165825423?h=8cfc5ddc23", project: "Saia Nina", part: null, platform: "vimeo" as const },
    { id: 77, title: "Conjunto Letícia", videoId: "1165867234?h=6e2eed84e2", project: "Conjunto Letícia", part: null, platform: "vimeo" as const },
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
    // Conjunto Zelly (3 partes)
    { id: 114, title: "Conjunto Zelly - Parte 1", videoId: "1166455028", project: "Conjunto Zelly", part: 1, platform: "vimeo" as const },
    { id: 115, title: "Conjunto Zelly - Parte 2", videoId: "1166455627", project: "Conjunto Zelly", part: 2, platform: "vimeo" as const },
    { id: 116, title: "Conjunto Zelly - Parte 3", videoId: "1166455708", project: "Conjunto Zelly", part: 3, platform: "vimeo" as const },
    // Cropped Livia
    { id: 117, title: "Cropped Livia", videoId: "1166455527", project: "Cropped Livia", part: null, platform: "vimeo" as const },
    // Conjunto Renata (2 partes)
    { id: 120, title: "Conjunto Renata - Parte 1", videoId: "1166454958", project: "Conjunto Renata", part: 1, platform: "vimeo" as const },
    { id: 121, title: "Conjunto Renata - Parte 2", videoId: "1166454814", project: "Conjunto Renata", part: 2, platform: "vimeo" as const },
    // Conjunto Íris (2 partes)
    { id: 129, title: "Conjunto Íris - Parte 1", videoId: "1166453580", project: "Conjunto Íris", part: 1, platform: "vimeo" as const },
    { id: 130, title: "Conjunto Íris - Parte 2", videoId: "1166453263", project: "Conjunto Íris", part: 2, platform: "vimeo" as const },
    // Conjunto Salles (3 partes)
    { id: 131, title: "Conjunto Salles - Parte 1", videoId: "1166454066", project: "Conjunto Salles", part: 1, platform: "vimeo" as const },
    { id: 132, title: "Conjunto Salles - Parte 2", videoId: "1166453471", project: "Conjunto Salles", part: 2, platform: "vimeo" as const },
    { id: 133, title: "Conjunto Salles - Parte 3", videoId: "1166453995", project: "Conjunto Salles", part: 3, platform: "vimeo" as const },
    // Conjunto Scheila (2 partes)
    { id: 134, title: "Conjunto Scheila - Parte 1", videoId: "1166453825", project: "Conjunto Scheila", part: 1, platform: "vimeo" as const },
    { id: 135, title: "Conjunto Scheila - Parte 2", videoId: "1166453931", project: "Conjunto Scheila", part: 2, platform: "vimeo" as const },
    // Cropped Angel
    { id: 136, title: "Cropped Angel", videoId: "1166453227", project: "Cropped Angel", part: null, platform: "vimeo" as const },
    // Cropped Anitta
    { id: 137, title: "Cropped Anitta", videoId: "1166452434", project: "Cropped Anitta", part: null, platform: "vimeo" as const },
    // Cropped Maré
    { id: 138, title: "Cropped Maré", videoId: "1166452773", project: "Cropped Maré", part: null, platform: "vimeo" as const },
    // Conjunto Suri (4 partes)
    { id: 150, title: "Conjunto Suri - Parte 1", videoId: "1166451943", project: "Conjunto Suri", part: 1, platform: "vimeo" as const },
    { id: 151, title: "Conjunto Suri - Parte 2", videoId: "1166452358", project: "Conjunto Suri", part: 2, platform: "vimeo" as const },
    { id: 152, title: "Conjunto Suri - Parte 3", videoId: "1166451783", project: "Conjunto Suri", part: 3, platform: "vimeo" as const },
    { id: 153, title: "Conjunto Suri - Parte 4", videoId: "1166452111", project: "Conjunto Suri", part: 4, platform: "vimeo" as const },
    // Conjunto Tamiris (2 partes)
    { id: 174, title: "Conjunto Tamiris - Parte 1", videoId: "1166455789", project: "Conjunto Tamiris", part: 1, platform: "vimeo" as const },
    { id: 175, title: "Conjunto Tamiris - Parte 2", videoId: "1166456097", project: "Conjunto Tamiris", part: 2, platform: "vimeo" as const },
    // Cropped Amari
    { id: 176, title: "Cropped Amari", videoId: "1166456178", project: "Cropped Amari", part: null, platform: "vimeo" as const },
    // Cropped Tati
    { id: 177, title: "Cropped Tati", videoId: "1166456612", project: "Cropped Tati", part: null, platform: "vimeo" as const },
  ].map((v, i, arr) => {
    // Distribute 206 videos across 259 display numbers for a natural feel
    const displayNumber = Math.round(((i) / (arr.length - 1)) * 258) + 1;
    return { ...v, id: i + 1, displayNumber };
  });

  const videos = videos_raw;

  // Extrair projetos únicos para o filtro
  const uniqueProjects = [...new Set(videos.map(v => v.project))];

  const [searchParams] = useSearchParams();
  // Reconstruct full Vimeo ID with privacy hash if present
  const rawVideoId = searchParams.get("video");
  const vimeoHash = searchParams.get("h");
  const autoplayVideoId = rawVideoId && vimeoHash ? `${rawVideoId}?h=${vimeoHash}` : rawVideoId;
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
  const batchSize = 10;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(getInitialVideoIndex);
  const [cameFromCarousel, setCameFromCarousel] = useState(!!autoplayVideoId);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [loadedThumbnailIds, setLoadedThumbnailIds] = useState<string[]>([]);
  const videoListRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

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

  const displayedVideos = filteredVideos;
  const visibleVideos = displayedVideos.slice(0, visibleCount);
  const currentBatchVideos = visibleVideos.slice(Math.max(visibleCount - batchSize, 0), visibleCount);

  useEffect(() => {
    setVisibleCount(Math.min(batchSize, displayedVideos.length));
    setLoadedThumbnailIds([]);
  }, [searchTerm, filterProject, displayedVideos.length]);

  const handleThumbnailReady = useCallback((videoId: string) => {
    setLoadedThumbnailIds(prev => prev.includes(videoId) ? prev : [...prev, videoId]);
  }, []);

  useEffect(() => {
    if (!currentBatchVideos.length || visibleCount >= displayedVideos.length) {
      return;
    }

    const currentBatchLoaded = currentBatchVideos.every(video =>
      loadedThumbnailIds.includes(video.videoId)
    );

    if (currentBatchLoaded) {
      setVisibleCount(prev => Math.min(prev + batchSize, displayedVideos.length));
    }
  }, [currentBatchVideos, displayedVideos.length, loadedThumbnailIds, visibleCount, batchSize]);

  const handleVideoSelect = (filteredIndex: number) => {
    const actualIndex = videos.findIndex(v => v.id === filteredVideos[filteredIndex].id);
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

        {/* Player Principal */}
        <div className="max-w-4xl mx-auto space-y-6 mb-10">
          <div className="animate-fade-in">
            <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
              <CustomVideoPlayer
                videoId={currentVideo.videoId}
                title={currentVideo.title}
                platform={currentVideo.platform as "youtube" | "vimeo"}
                autoplay={true}
                showPixMessage={false}
                customThumbnail={getVideoThumbnail(currentVideo.videoId, currentVideo.platform)}
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
                variant="outline"
                size="icon"
                onClick={() => toggleFavorite({ videoId: currentVideo.videoId, title: currentVideo.title, thumbnail: getVideoThumbnail(currentVideo.videoId, currentVideo.platform), module: "Vestidos de Crochê", modulePath: "/vestidos-croche" })}
                className={`shrink-0 ${isFavorite(currentVideo.videoId) ? 'text-primary border-primary/50 bg-primary/10' : ''}`}
                aria-label="Favoritar"
              >
                <Heart className={`h-4 w-4 ${isFavorite(currentVideo.videoId) ? 'fill-current' : ''}`} />
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

        {/* Todas as Aulas - Full Width */}
        <section className="animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Todas as Aulas (259)
            </h2>
            <p className="text-muted-foreground">Clique em qualquer aula para assistir</p>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-2xl mx-auto">
            <Input
              placeholder="Buscar aula ou projeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10"
            />
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="h-10 sm:w-[220px]">
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

          {/* Grid de Vídeos */}
          <div ref={videoListRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleVideos.map((video, index) => {
              const actualIndex = videos.findIndex(v => v.id === video.id);
              return (
                <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(index, 10) * 0.03}s` }}>
                  <VideoCard
                    title={video.title}
                    duration={video.part ? `Parte ${video.part}` : "Completo"}
                    thumbnail={getVideoThumbnail(video.videoId, video.platform)}
                    videoNumber={video.displayNumber}
                    isActive={actualIndex === currentVideoIndex}
                    isFavorite={isFavorite(video.videoId)}
                    onImageReady={() => handleThumbnailReady(video.videoId)}
                    onToggleFavorite={() => toggleFavorite({ videoId: video.videoId, title: video.title, thumbnail: getVideoThumbnail(video.videoId, video.platform), module: "Vestidos de Crochê", modulePath: "/vestidos-croche" })}
                    onClick={() => handleVideoSelect(index)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Sobre esta Aula - no final */}
        <div className="max-w-4xl mx-auto mt-10">
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
