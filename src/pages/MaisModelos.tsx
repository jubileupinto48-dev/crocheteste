import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFavorites } from "@/hooks/use-favorites";

const customThumbnails: Record<string, string> = {
  // Conjunto Rosas
  "1165896656?h=71c1d6054e": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045923/conjunto_rosas_soqjqj.jpg",
  // Top Estrela Brasil
  "1165908076?h=3b842fbf9d": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047760/S-Vp3QiN1Tk-HD_ri9ivl.jpg",
  // Conjunto Franja
  "1165823586?h=95ae5df629": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/CONJUNTO_FRANJAS_h1ftat.png",
  "1165823379?h=de1eeffff5": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/CONJUNTO_FRANJAS_h1ftat.png",
  // Conjunto Square
  "1165896871?h=f4895dbef0": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045933/Square_rhpjpk.jpg",
  // Cropped Duda
  "1165825953?h=b67785daa5": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/CROPPED_DUDA_spalfj.png",
  // Cropped Lola
  "1165828668?h=95dd4603c4": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/CROPPED_LOLA_ydkvxo.png",
  // Conjunto Cali
  "1165828774?h=0add065419": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/CONJJUNTO_CALI_upmtoq.png",
  "1165828605?h=58d11062d4": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/CONJJUNTO_CALI_upmtoq.png",
  "1165828438?h=456ae1cdb5": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/CONJJUNTO_CALI_upmtoq.png",
  "1165828229?h=4acb08a378": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/CONJJUNTO_CALI_upmtoq.png",
  // Calça Correntinha
  "1165823422?h=3bad21440c": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/CAL%C3%87A_CORRENTINHA_rzigbd.png",
  // Conjunto Lore
  "1165827131?h=c55fa2bddb": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_LORE_lxfjfq.png",
  "1165827332?h=75278547ee": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_LORE_lxfjfq.png",
  "1165824975?h=29ac896d60": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_LORE_lxfjfq.png",
  // Saia Laura
  "1165823777?h=2148619f8b": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/SAIA_LAURA_xbzaga.png",
  // Conjunto Gabi
  "1165823492?h=049b68c02a": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/CONJUNTO_GABI_krxgin.png",
  "1165823953?h=6133197ea0": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/CONJUNTO_GABI_krxgin.png",
  "1165823551?h=e845f3f59b": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/CONJUNTO_GABI_krxgin.png",
  // Macacão Grassi
  "1165828975?h=b2f003a62f": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/MACAC%C3%83O_GRASSI_wvr8fn.png",
  "1165829345?h=67f801752d": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/MACAC%C3%83O_GRASSI_wvr8fn.png",
  // Calça Tela
  "1165823210?h=b5372b698b": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/CAL%C3%87A_TELA_pqnflb.png",
  // Conjunto com Paetê Acrílico
  "1165823127?h=80846c06c2": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043456/CONJUNTO_PAETE_zkywnw.png",
  // Cropped Ana Clara
  "1165823296?h=588db44c04": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043456/CROPPED_ANNA_CLARA_xiipsc.png",
  // Suéter Sofia
  "1165829840?h=bda1e8e5be": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/SU%C3%89TER_SOFIA_v1ku1h.png",
  "1165828330?h=b9b9868fd2": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/SU%C3%89TER_SOFIA_v1ku1h.png",
  // Conjunto Lisi
  "1165825489?h=4953414a7c": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043454/CONJUNTO_LISI_j8klpy.png",
  "1165825673?h=fb8f804677": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043454/CONJUNTO_LISI_j8klpy.png",
  // Biquíni Eva
  "1165826908?h=cf3b0678ab": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/BIQUINI_EVA_cysjja.png",
  // Saia Amanda
  "1165826996?h=639389fcf0": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/SAIA_AMANDA_bkehf3.png",
  // Saia Nina
  "1165825423?h=8cfc5ddc23": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/SAIA_NINA_vejuo5.png",
  // Conjunto Letícia
  "1165867234?h=6e2eed84e2": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/CONJUNTO_LETICIA_hrsn9n.png",
  // Sousplato Girafa
  "1165898764?h=290f75b513": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/sousplate_r6c5il.jpg",
  // Saida Tereza
  "1165899713?h=063db9139d": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/tereza_k5tibo.jpg",
  // Saida Shirley
  "1165908374?h=954ee77336": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103640/XReZUJvzft0-HD_xd8fk4.jpg",
  // Saida Renata
  "1165899950?h=65fb9d0fc3": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/renata_s8onby.jpg",
  // Saida Betania
  "1165900227?h=ab8c1eb8e3": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/betania_vkoiiz.jpg",
  // Saida Midi
  "1165900453?h=3a7d240268": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/saia_midi_g8vdas.png",
  // Cropped Garden
  "1165900701?h=fc8686d056": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/Gardeen_secuhp.jpg",
  // Corset de Crochê
  "1165900912?h=25ab81c66e": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045923/corset_de_croche_sncoso.jpg",
  // Corset Angel
  "1165901257?h=ba7889f004": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/corset_angel_sufv2t.jpg",
  // Corset em V
  "1165901491?h=5bf59bc49e": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045923/corset_em_v_xqkgcd.jpg",
  // Conjunto Tereza
  "1165901832?h=5c0b941af2": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/Conjunto_Tereeza_uhatth.jpg",
  // Conjunto Tardezinha
  "1165902033?h=67a0e24c41": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045939/tardezinha_cbzmqw.jpg",
  // Biquini Rendado
  "1165415971?h=dd327a58fb": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286793/fKLX4pMjmck-SD_bnzvlf.jpg",
  // Conjunto Crochê Brilho
  "1165902686?h=192b4bb0cb": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045940/conjunto_brilho_faosa4.jpg",
  // Conjunto Praiana
  "1165902854?h=c106849f13": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045940/Praiana_obj44o.jpg",
  // Conjunto Camila
  "1165905050?h=ddfb626d58": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045938/camila_hnnj1k.jpg",
  // Calça Thais
  "1165905314?h=0abf93f051": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045935/cal%C3%A7a_thais_jcfhxl.jpg",
  // Saida Brasil
  "1165908138?h=11ec544581": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049577/DxUeSn4p-Rg-HD_oq7myk.jpg",
  // Biquini Tomara que Caia
  "1165416602?h=239fa20e43": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049602/vrCyt1O4SjU-HD_gbgsdl.jpg",
  // Top Brasil
  "1165908193?h=44ce060d5e": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049580/IRnqSP9VCsg-HD_gxyv5p.jpg",
  // === Novos vídeos do módulo de vestidos ===
  // Conjunto Zelly
  "1166455028": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049583/DOURADO_QUADRADO_1_ylbpz1.png",
  "1166455627": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049583/DOURADO_QUADRADO_1_ylbpz1.png",
  "1166455708": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049583/DOURADO_QUADRADO_1_ylbpz1.png",
  // Cropped Livia
  "1166455527": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103641/DOURADO_QUADRADO_6_f8xvnv.png",
  // Conjunto Renata
  "1166454958": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049587/CONJUNTO_RENATA_vxtxcm.png",
  "1166454814": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049587/CONJUNTO_RENATA_vxtxcm.png",
  // Conjunto Íris
  "1166453580": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049592/CONJUNTO_RENATA_1_uu065u.png",
  "1166453263": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049592/CONJUNTO_RENATA_1_uu065u.png",
  // Conjunto Salles
  "1166454066": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049593/DOURADO_QUADRADO_4_hvvt38.png",
  "1166453471": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049593/DOURADO_QUADRADO_4_hvvt38.png",
  "1166453995": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049593/DOURADO_QUADRADO_4_hvvt38.png",
  // Conjunto Scheila
  "1166453825": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049594/CONJUNTO_RENATA_2_lzujon.png",
  "1166453931": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049594/CONJUNTO_RENATA_2_lzujon.png",
  // Cropped Angel
  "1166453227": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103646/DOURADO_QUADRADO_7_s7yqag.png",
  // Cropped Anitta
  "1166452434": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049596/DOURADO_QUADRADO_5_c2elvl.png",
  // Cropped Maré
  "1166452773": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049597/CONJUNTO_RENATA_3_bu0xjs.png",
  // Conjunto Suri
  "1166451943": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103641/DOURADO_QUADRADO_8_oxelic.png",
  "1166452358": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103641/DOURADO_QUADRADO_8_oxelic.png",
  "1166451783": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103641/DOURADO_QUADRADO_8_oxelic.png",
  "1166452111": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103641/DOURADO_QUADRADO_8_oxelic.png",
  // Conjunto Tamiris
  "1166455789": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103642/VERDE_QUADRADO_3_k684sj.png",
  "1166456097": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103642/VERDE_QUADRADO_3_k684sj.png",
  // Cropped Amari
  "1166456178": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103643/VERDE_QUADRADO_4_zd2b9a.png",
  // Cropped Tati
  "1166456612": "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047758/VERDE_QUADRADO_yqzhxu.png",
};

const getVideoThumbnail = (videoId: string, platform?: string) => {
  if (customThumbnails[videoId]) return customThumbnails[videoId];
  if (platform === "vimeo") return `https://vumbnail.com/${videoId.split('?')[0]}.jpg`;
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const MaisModelos = () => {
  const isMobile = useIsMobile();

  const videos = [
    { id: 1, title: "Conjunto Rosas", videoId: "1165896656?h=71c1d6054e", project: "Conjunto Rosas", part: null, platform: "vimeo" as const },
    { id: 2, title: "Top Estrela Brasil", videoId: "1165908076?h=3b842fbf9d", project: "Top Estrela Brasil", part: null, platform: "vimeo" as const },
    { id: 3, title: "Conjunto Franja - Parte 1", videoId: "1165823586?h=95ae5df629", project: "Conjunto Franja", part: 1, platform: "vimeo" as const },
    { id: 4, title: "Conjunto Franja - Parte 2", videoId: "1165823379?h=de1eeffff5", project: "Conjunto Franja", part: 2, platform: "vimeo" as const },
    { id: 5, title: "Conjunto Square", videoId: "1165896871?h=f4895dbef0", project: "Conjunto Square", part: null, platform: "vimeo" as const },
    { id: 6, title: "Cropped Duda", videoId: "1165825953?h=b67785daa5", project: "Cropped Duda", part: null, platform: "vimeo" as const },
    { id: 7, title: "Cropped Lola", videoId: "1165828668?h=95dd4603c4", project: "Cropped Lola", part: null, platform: "vimeo" as const },
    { id: 8, title: "Conjunto Cali - Parte 1", videoId: "1165828774?h=0add065419", project: "Conjunto Cali", part: 1, platform: "vimeo" as const },
    { id: 9, title: "Conjunto Cali - Parte 2", videoId: "1165828605?h=58d11062d4", project: "Conjunto Cali", part: 2, platform: "vimeo" as const },
    { id: 10, title: "Conjunto Cali - Parte 3", videoId: "1165828438?h=456ae1cdb5", project: "Conjunto Cali", part: 3, platform: "vimeo" as const },
    { id: 11, title: "Conjunto Cali - Parte 4", videoId: "1165828229?h=4acb08a378", project: "Conjunto Cali", part: 4, platform: "vimeo" as const },
    { id: 12, title: "Calça Correntinha", videoId: "1165823422?h=3bad21440c", project: "Calça Correntinha", part: null, platform: "vimeo" as const },
    { id: 13, title: "Conjunto Lore - Parte 1", videoId: "1165827131?h=c55fa2bddb", project: "Conjunto Lore", part: 1, platform: "vimeo" as const },
    { id: 14, title: "Conjunto Lore - Parte 2", videoId: "1165827332?h=75278547ee", project: "Conjunto Lore", part: 2, platform: "vimeo" as const },
    { id: 15, title: "Conjunto Lore - Parte 3", videoId: "1165824975?h=29ac896d60", project: "Conjunto Lore", part: 3, platform: "vimeo" as const },
    { id: 16, title: "Saia Laura", videoId: "1165823777?h=2148619f8b", project: "Saia Laura", part: null, platform: "vimeo" as const },
    { id: 17, title: "Conjunto Gabi - Parte 1", videoId: "1165823492?h=049b68c02a", project: "Conjunto Gabi", part: 1, platform: "vimeo" as const },
    { id: 18, title: "Conjunto Gabi - Parte 2", videoId: "1165823953?h=6133197ea0", project: "Conjunto Gabi", part: 2, platform: "vimeo" as const },
    { id: 19, title: "Conjunto Gabi - Dica Extra", videoId: "1165823551?h=e845f3f59b", project: "Conjunto Gabi", part: 3, platform: "vimeo" as const },
    { id: 20, title: "Macacão Grassi - Parte 1", videoId: "1165828975?h=b2f003a62f", project: "Macacão Grassi", part: 1, platform: "vimeo" as const },
    { id: 21, title: "Macacão Grassi - Parte 2", videoId: "1165829345?h=67f801752d", project: "Macacão Grassi", part: 2, platform: "vimeo" as const },
    { id: 22, title: "Calça Tela", videoId: "1165823210?h=b5372b698b", project: "Calça Tela", part: null, platform: "vimeo" as const },
    { id: 23, title: "Conjunto com Paetê Acrílico", videoId: "1165823127?h=80846c06c2", project: "Conjunto com Paetê Acrílico", part: null, platform: "vimeo" as const },
    { id: 24, title: "Cropped Ana Clara", videoId: "1165823296?h=588db44c04", project: "Cropped Ana Clara", part: null, platform: "vimeo" as const },
    { id: 25, title: "Suéter Sofia - Parte 1", videoId: "1165829840?h=bda1e8e5be", project: "Suéter Sofia", part: 1, platform: "vimeo" as const },
    { id: 26, title: "Suéter Sofia - Parte 2", videoId: "1165828330?h=b9b9868fd2", project: "Suéter Sofia", part: 2, platform: "vimeo" as const },
    { id: 27, title: "Conjunto Lisi - Parte 1", videoId: "1165825489?h=4953414a7c", project: "Conjunto Lisi", part: 1, platform: "vimeo" as const },
    { id: 28, title: "Conjunto Lisi - Parte 2", videoId: "1165825673?h=fb8f804677", project: "Conjunto Lisi", part: 2, platform: "vimeo" as const },
    { id: 29, title: "Biquíni Eva", videoId: "1165826908?h=cf3b0678ab", project: "Biquíni Eva", part: null, platform: "vimeo" as const },
    { id: 30, title: "Saia Amanda", videoId: "1165826996?h=639389fcf0", project: "Saia Amanda", part: null, platform: "vimeo" as const },
    { id: 31, title: "Saia Nina", videoId: "1165825423?h=8cfc5ddc23", project: "Saia Nina", part: null, platform: "vimeo" as const },
    { id: 32, title: "Conjunto Letícia", videoId: "1165867234?h=6e2eed84e2", project: "Conjunto Letícia", part: null, platform: "vimeo" as const },
    { id: 33, title: "Sousplato Girafa", videoId: "1165898764?h=290f75b513", project: "Sousplato Girafa", part: null, platform: "vimeo" as const },
    { id: 34, title: "Saida Tereza", videoId: "1165899713?h=063db9139d", project: "Saida Tereza", part: null, platform: "vimeo" as const },
    { id: 35, title: "Saida Shirley", videoId: "1165908374?h=954ee77336", project: "Saida Shirley", part: null, platform: "vimeo" as const },
    { id: 36, title: "Saida Renata", videoId: "1165899950?h=65fb9d0fc3", project: "Saida Renata", part: null, platform: "vimeo" as const },
    { id: 37, title: "Saida Betania", videoId: "1165900227?h=ab8c1eb8e3", project: "Saida Betania", part: null, platform: "vimeo" as const },
    { id: 38, title: "Saida Midi", videoId: "1165900453?h=3a7d240268", project: "Saida Midi", part: null, platform: "vimeo" as const },
    { id: 39, title: "Cropped Garden", videoId: "1165900701?h=fc8686d056", project: "Cropped Garden", part: null, platform: "vimeo" as const },
    { id: 40, title: "Corset de Crochê", videoId: "1165900912?h=25ab81c66e", project: "Corset de Crochê", part: null, platform: "vimeo" as const },
    { id: 41, title: "Corset Angel", videoId: "1165901257?h=ba7889f004", project: "Corset Angel", part: null, platform: "vimeo" as const },
    { id: 42, title: "Corset em V", videoId: "1165901491?h=5bf59bc49e", project: "Corset em V", part: null, platform: "vimeo" as const },
    { id: 43, title: "Conjunto Tereza", videoId: "1165901832?h=5c0b941af2", project: "Conjunto Tereza", part: null, platform: "vimeo" as const },
    { id: 44, title: "Conjunto Tardezinha", videoId: "1165902033?h=67a0e24c41", project: "Conjunto Tardezinha", part: null, platform: "vimeo" as const },
    { id: 45, title: "Biquini Rendado", videoId: "1165415971?h=dd327a58fb", project: "Biquini Rendado", part: null, platform: "vimeo" as const },
    { id: 46, title: "Conjunto de Crochê Brilho", videoId: "1165902686?h=192b4bb0cb", project: "Conjunto Crochê Brilho", part: null, platform: "vimeo" as const },
    { id: 47, title: "Conjunto Praiana", videoId: "1165902854?h=c106849f13", project: "Conjunto Praiana", part: null, platform: "vimeo" as const },
    { id: 48, title: "Conjunto Camila", videoId: "1165905050?h=ddfb626d58", project: "Conjunto Camila", part: null, platform: "vimeo" as const },
    { id: 49, title: "Calça Thais", videoId: "1165905314?h=0abf93f051", project: "Calça Thais", part: null, platform: "vimeo" as const },
    { id: 50, title: "Saida Brasil", videoId: "1165908138?h=11ec544581", project: "Saida Brasil", part: null, platform: "vimeo" as const },
    { id: 51, title: "Biquini Tomara que Caia", videoId: "1165416602?h=239fa20e43", project: "Biquini Tomara que Caia", part: null, platform: "vimeo" as const },
    { id: 52, title: "Top Brasil", videoId: "1165908193?h=44ce060d5e", project: "Top Brasil", part: null, platform: "vimeo" as const },
    // === Novos vídeos do módulo de vestidos ===
    { id: 53, title: "Conjunto Zelly - Parte 1", videoId: "1166455028", project: "Conjunto Zelly", part: 1, platform: "vimeo" as const },
    { id: 54, title: "Conjunto Zelly - Parte 2", videoId: "1166455627", project: "Conjunto Zelly", part: 2, platform: "vimeo" as const },
    { id: 55, title: "Conjunto Zelly - Parte 3", videoId: "1166455708", project: "Conjunto Zelly", part: 3, platform: "vimeo" as const },
    { id: 56, title: "Cropped Livia", videoId: "1166455527", project: "Cropped Livia", part: null, platform: "vimeo" as const },
    { id: 57, title: "Conjunto Renata - Parte 1", videoId: "1166454958", project: "Conjunto Renata", part: 1, platform: "vimeo" as const },
    { id: 58, title: "Conjunto Renata - Parte 2", videoId: "1166454814", project: "Conjunto Renata", part: 2, platform: "vimeo" as const },
    { id: 59, title: "Conjunto Íris - Parte 1", videoId: "1166453580", project: "Conjunto Íris", part: 1, platform: "vimeo" as const },
    { id: 60, title: "Conjunto Íris - Parte 2", videoId: "1166453263", project: "Conjunto Íris", part: 2, platform: "vimeo" as const },
    { id: 61, title: "Conjunto Salles - Parte 1", videoId: "1166454066", project: "Conjunto Salles", part: 1, platform: "vimeo" as const },
    { id: 62, title: "Conjunto Salles - Parte 2", videoId: "1166453471", project: "Conjunto Salles", part: 2, platform: "vimeo" as const },
    { id: 63, title: "Conjunto Salles - Parte 3", videoId: "1166453995", project: "Conjunto Salles", part: 3, platform: "vimeo" as const },
    { id: 64, title: "Conjunto Scheila - Parte 1", videoId: "1166453825", project: "Conjunto Scheila", part: 1, platform: "vimeo" as const },
    { id: 65, title: "Conjunto Scheila - Parte 2", videoId: "1166453931", project: "Conjunto Scheila", part: 2, platform: "vimeo" as const },
    { id: 66, title: "Cropped Angel", videoId: "1166453227", project: "Cropped Angel", part: null, platform: "vimeo" as const },
    { id: 67, title: "Cropped Anitta", videoId: "1166452434", project: "Cropped Anitta", part: null, platform: "vimeo" as const },
    { id: 68, title: "Cropped Maré", videoId: "1166452773", project: "Cropped Maré", part: null, platform: "vimeo" as const },
    { id: 69, title: "Conjunto Suri - Parte 1", videoId: "1166451943", project: "Conjunto Suri", part: 1, platform: "vimeo" as const },
    { id: 70, title: "Conjunto Suri - Parte 2", videoId: "1166452358", project: "Conjunto Suri", part: 2, platform: "vimeo" as const },
    { id: 71, title: "Conjunto Suri - Parte 3", videoId: "1166451783", project: "Conjunto Suri", part: 3, platform: "vimeo" as const },
    { id: 72, title: "Conjunto Suri - Parte 4", videoId: "1166452111", project: "Conjunto Suri", part: 4, platform: "vimeo" as const },
    { id: 73, title: "Conjunto Tamiris - Parte 1", videoId: "1166455789", project: "Conjunto Tamiris", part: 1, platform: "vimeo" as const },
    { id: 74, title: "Conjunto Tamiris - Parte 2", videoId: "1166456097", project: "Conjunto Tamiris", part: 2, platform: "vimeo" as const },
    { id: 75, title: "Cropped Amari", videoId: "1166456178", project: "Cropped Amari", part: null, platform: "vimeo" as const },
    { id: 76, title: "Cropped Tati", videoId: "1166456612", project: "Cropped Tati", part: null, platform: "vimeo" as const },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const { isFavorite, toggleFavorite } = useFavorites();

  const uniqueProjects = [...new Set(videos.map(v => v.project))].sort();

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === "all" || video.project === filterProject;
    return matchesSearch && matchesProject;
  });

  const handleVideoSelect = (index: number) => {
    const actualIndex = videos.findIndex(v => v.id === filteredVideos[index].id);
    setCurrentVideoIndex(actualIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
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
        <div className="max-w-4xl mx-auto mb-10">
          <div className="animate-fade-in">
            <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
              <CustomVideoPlayer
                videoId={currentVideo.videoId}
                title={currentVideo.title}
                platform={currentVideo.platform}
                autoplay={true}
                showPixMessage={false}
                customThumbnail={getVideoThumbnail(currentVideo.videoId, currentVideo.platform)}
              />
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentVideoIndex === 0} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Button variant="outline" size="icon"
                onClick={() => toggleFavorite({ videoId: currentVideo.videoId, title: currentVideo.title, thumbnail: getVideoThumbnail(currentVideo.videoId, currentVideo.platform), module: "Modelos Adulto", modulePath: "/mais-modelos" })}
                className={`shrink-0 ${isFavorite(currentVideo.videoId) ? 'text-primary border-primary/50 bg-primary/10' : ''}`}
                aria-label="Favoritar"
              >
                <Heart className={`h-4 w-4 ${isFavorite(currentVideo.videoId) ? 'fill-current' : ''}`} />
              </Button>
              <Button onClick={handleNext} disabled={currentVideoIndex === videos.length - 1} className="flex-1">
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Todas as Aulas */}
        <section className="animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Todas as Aulas ({videos.length})</h2>
            <p className="text-muted-foreground">Clique em qualquer aula para assistir</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-2xl mx-auto">
            <Input placeholder="Buscar aula ou projeto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-10" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video, index) => {
              const actualIndex = videos.findIndex(v => v.id === video.id);
              return (
                <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(index, 10) * 0.03}s` }}>
                  <VideoCard
                    title={video.title}
                    duration={video.part ? `Parte ${video.part}` : "Completo"}
                    thumbnail={getVideoThumbnail(video.videoId, video.platform)}
                    videoNumber={video.id}
                    isActive={actualIndex === currentVideoIndex}
                    isFavorite={isFavorite(video.videoId)}
                    onToggleFavorite={() => toggleFavorite({ videoId: video.videoId, title: video.title, thumbnail: getVideoThumbnail(video.videoId, video.platform), module: "Modelos Adulto", modulePath: "/mais-modelos" })}
                    onClick={() => handleVideoSelect(index)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Sobre */}
        <div className="max-w-4xl mx-auto mt-10">
          <Card className="shadow-card">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sobre esta Aula</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neste tutorial completo, você aprenderá todas as técnicas necessárias para 
                criar este lindo {currentVideo.project.toLowerCase()}. Siga o passo a passo com atenção e tire 
                suas dúvidas nos comentários.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">IA</span>
                  Visualização do Projeto
                </h4>
                <div className="grid grid-cols-1 gap-4">
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
  );
};

export default MaisModelos;
