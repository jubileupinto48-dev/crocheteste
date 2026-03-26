import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface FeaturedVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

// Pool completo de projetos do módulo de vestidos — 1 representante por projeto com thumbnail única
const allModuleVideos: FeaturedVideo[] = [
  { id: "longo", title: "Vestido Longo de Crochê", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773046623/SCgWr3Kv-pI-HD_eko3j4.jpg", videoId: "1165908032?h=4e8257a515" },
  { id: "decotev", title: "Vestido Decote V", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047750/ozGPS_H5J44-HD_sw9j84.jpg", videoId: "1165903186?h=bb7c0e0908" },
  { id: "raquel", title: "Vestido Raquel", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773051517/VEERDE_VERTICAL_1_lbzzfr.png", videoId: "1165877185?h=ce49de91b5" },
  { id: "renata", title: "Saída Renata", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/renata_s8onby.jpg", videoId: "1165899950?h=65fb9d0fc3" },
  { id: "ciganinha", title: "Vestido Ciganinha", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047763/ra2ZISYUD0c-HD_imdon6.jpg", videoId: "1165905541?h=441d91f0bc" },
  { id: "luxo", title: "Vestido Luxo", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047762/_EEt2dLuozA-SD_mtvjdh.jpg", videoId: "1165412197?h=0fa29c051a" },
  { id: "cleopatra", title: "Vestido Cleópatra", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047761/Ia19Yf-H08g-HD_hte8dw.jpg", videoId: "1165896182?h=2ff4b53004" },
  { id: "rosas", title: "Conjunto Rosas", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045923/conjunto_rosas_soqjqj.jpg", videoId: "1165896656?h=71c1d6054e" },
  { id: "estrela", title: "Top Estrela Brasil", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047760/S-Vp3QiN1Tk-HD_ri9ivl.jpg", videoId: "1165908076?h=3b842fbf9d" },
  { id: "square", title: "Conjunto Square", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045933/Square_rhpjpk.jpg", videoId: "1165896871?h=f4895dbef0" },
  { id: "sereia", title: "Vestido Sereia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045933/Sereia_atfalv.jpg", videoId: "1165908266?h=61b6de8549" },
  { id: "anaclara", title: "Vestido Ana Clara", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045933/ana_clara_wljb8z.jpg", videoId: "1165898325?h=5af0c2457f" },
  { id: "camila", title: "Vestido Camila", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045933/vestido_camila_kxtbf2.jpg", videoId: "1165897115?h=2e6bdf5c09" },
  { id: "concha", title: "Vestido Concha", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045932/Conchas_tr07gp.jpg", videoId: "1165897327?h=bf84e16cb9" },
  { id: "darlene", title: "Vestido Darlene", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045933/darlene_x34xoj.jpg", videoId: "1165907603?h=bccb08fbbc" },
  { id: "saida", title: "Vestido Crochê Saída", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045934/Vestido_Croch%C3%AA_Saida_bcziqy.jpg", videoId: "1165897423?h=6d46bec5f5" },
  { id: "evelyne", title: "Vestido Evelyne", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045932/Evelyne_i74mfw.jpg", videoId: "1165897740?h=21a8c932d8" },
  { id: "flavia", title: "Vestido Flávia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045934/Vestido_Flavia_nbarqa.jpg", videoId: "1165897922?h=83924a6988" },
  { id: "noiva", title: "Vestido Noiva Longo", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/Longo_Noiva_xcsavk.jpg", videoId: "1165417274?h=8e8af3b41e" },
  { id: "mocambique", title: "Vestido Moçambique", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/mo%C3%A7ambique_ijbk2n.jpg", videoId: "1165898928?h=ce0edc64ab" },
  { id: "tereza", title: "Saída Tereza", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/tereza_k5tibo.jpg", videoId: "1165899713?h=063db9139d" },
  { id: "betania", title: "Saída Betânia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/betania_vkoiiz.jpg", videoId: "1165900227?h=ab8c1eb8e3" },
  { id: "midi", title: "Saída Mídi", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/saia_midi_g8vdas.png", videoId: "1165900453?h=3a7d240268" },
  { id: "garden", title: "Cropped Garden", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/Gardeen_secuhp.jpg", videoId: "1165900701?h=fc8686d056" },
  { id: "corset", title: "Corset de Crochê", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045923/corset_de_croche_sncoso.jpg", videoId: "1165900912?h=25ab81c66e" },
  { id: "corsetangel", title: "Corset Angel", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/corset_angel_sufv2t.jpg", videoId: "1165901257?h=ba7889f004" },
  { id: "corsetv", title: "Corset em V", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045923/corset_em_v_xqkgcd.jpg", videoId: "1165901491?h=5bf59bc49e" },
  { id: "conjtereza", title: "Conjunto Tereza", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045924/Conjunto_Tereeza_uhatth.jpg", videoId: "1165901832?h=5c0b941af2" },
  { id: "tardezinha", title: "Conjunto Tardezinha", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045939/tardezinha_cbzmqw.jpg", videoId: "1165902033?h=67a0e24c41" },
  { id: "brilho", title: "Conjunto Brilho", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045940/conjunto_brilho_faosa4.jpg", videoId: "1165902686?h=192b4bb0cb" },
  { id: "praiana", title: "Conjunto Praiana", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045940/Praiana_obj44o.jpg", videoId: "1165902854?h=c106849f13" },
  { id: "conjcamila", title: "Conjunto Camila", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045938/camila_hnnj1k.jpg", videoId: "1165905050?h=ddfb626d58" },
  { id: "biquini", title: "Biquíni Tomara que Caia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049602/vrCyt1O4SjU-HD_gbgsdl.jpg", videoId: "1165416602?h=239fa20e43" },
  { id: "topbrasil", title: "Top Brasil", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049580/IRnqSP9VCsg-HD_gxyv5p.jpg", videoId: "1165908193?h=44ce060d5e" },
  { id: "saidabrasil", title: "Saída Brasil", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049577/DxUeSn4p-Rg-HD_oq7myk.jpg", videoId: "1165908138?h=11ec544581" },
  { id: "virginia", title: "Vestido Virginia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/VESTIDO_VIRGINIA_n9udlg.png", videoId: "1165822436?h=73db5fd949" },
  { id: "angel", title: "Vestido Angel", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/VESTIDO_ANGEL_hwuwdi.png", videoId: "1165822536?h=494836d768" },
  { id: "melmaia", title: "Saída Mel Maia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043462/SAIDA_MEL_MAIA_o7cdcq.png", videoId: "1165822238?h=798063ee5e" },
  { id: "franjas", title: "Conjunto Franjas", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/CONJUNTO_FRANJAS_h1ftat.png", videoId: "1165823586?h=95ae5df629" },
  { id: "maria", title: "Vestido Maria", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/VESTIDO_MARIA_dhx6ur.png", videoId: "1165822301?h=88af25dec4" },
  { id: "duda", title: "Cropped Duda", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/CROPPED_DUDA_spalfj.png", videoId: "1165825953?h=b67785daa5" },
  { id: "nala", title: "Vestido Nala", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/VESTIDO_NALA_ak8txp.png", videoId: "1165828828?h=a4c932ccd4" },
  { id: "lola", title: "Cropped Lola", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/CROPPED_LOLA_ydkvxo.png", videoId: "1165828668?h=95dd4603c4" },
  { id: "anapaula", title: "Vestido Ana Paula", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_ANA_PAULA_hltiko.png", videoId: "1165825235?h=e65562ca75" },
  { id: "sophia", title: "Vestido Sophia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043454/VESTIDO_SOPHIA_rtsfgq.png", videoId: "1165826517?h=288eec92f1" },
  { id: "julianapaes", title: "Vestido Juliana Paes", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/VESTIDO_JULIANA_PAES_y312fp.png", videoId: "1165823703?h=f2563c95af" },
  { id: "cali", title: "Conjunto Cali", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043457/CONJJUNTO_CALI_upmtoq.png", videoId: "1165828774?h=0add065419" },
  { id: "moana", title: "Vestido Moana", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043454/VESTIDO_MOANA_zy6qa6.png", videoId: "1165826035?h=8dbfaef2b0" },
  { id: "larissa", title: "Vestido Larissa", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043460/VESTIDO_LARISSA_p5z5hd.png", videoId: "1165829701?h=c3dde6b38a" },
  { id: "vanessa", title: "Vestido Vanessa", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/VESTIDO_VANESSA_zzralg.png", videoId: "1165827065?h=0540e2af34" },
  { id: "lore", title: "Conjunto Lore", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_LORE_lxfjfq.png", videoId: "1165827131?h=c55fa2bddb" },
  { id: "bel", title: "Vestido Bel", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_BEL_nrxuwc.png", videoId: "1165826717?h=fd78660abf" },
  { id: "gabi", title: "Conjunto Gabi", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/CONJUNTO_GABI_krxgin.png", videoId: "1165823492?h=049b68c02a" },
  { id: "grassi", title: "Macacão Grassi", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/MACAC%C3%83O_GRASSI_wvr8fn.png", videoId: "1165828975?h=b2f003a62f" },
  { id: "yara", title: "Vestido Yara", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/VESTIDO_YARA_ixqpwc.png", videoId: "1165825327?h=6fcce5e502" },
  { id: "vanda", title: "Vestido Vanda", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/VESTIDO_VANDA_hxtzkf.png", videoId: "1165826807?h=56f86f1de4" },
  { id: "patricia", title: "Vestido Patricia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043459/VESTIDO_PATRICIA_s0vtql.png", videoId: "1165823890?h=8a3a44f1d3" },
  { id: "lisi", title: "Conjunto Lisi", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043454/CONJUNTO_LISI_j8klpy.png", videoId: "1165825489?h=4953414a7c" },
  { id: "eva", title: "Biquíni Eva", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/BIQUINI_EVA_cysjja.png", videoId: "1165826908?h=cf3b0678ab" },
  { id: "amanda", title: "Saia Amanda", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/SAIA_AMANDA_bkehf3.png", videoId: "1165826996?h=639389fcf0" },
  { id: "nina", title: "Saia Nina", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043458/SAIA_NINA_vejuo5.png", videoId: "1165825423?h=8cfc5ddc23" },
  { id: "ana", title: "Vestido Ana", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_ANA_izi5dr.png", videoId: "1165825582?h=f833fa35d1" },
  { id: "marina", title: "Vestido Marina", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043455/VESTIDO_MARINA_upet9y.png", videoId: "1165826240?h=bb6309f319" },
  { id: "leticia", title: "Conjunto Letícia", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773043453/CONJUNTO_LETICIA_hrsn9n.png", videoId: "1165867234?h=6e2eed84e2" },
  { id: "poetapatricia", title: "Vestido Patricia Poeta", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049582/ROSA_VERTICAL_1_bdwlgf.png", videoId: "1166455223" },
  { id: "zelly", title: "Conjunto Zelly", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049583/DOURADO_QUADRADO_1_ylbpz1.png", videoId: "1166455028" },
  { id: "alice", title: "Vestido Alice", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049586/DOURADO_QUADRADO_2_qezlnx.png", videoId: "1166454267" },
  { id: "conjrenata", title: "Conjunto Renata", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049587/CONJUNTO_RENATA_vxtxcm.png", videoId: "1166454958" },
  { id: "lari", title: "Vestido Lari", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049589/DOURADO_QUADRADO_3_wfwr2v.png", videoId: "1166454494" },
  { id: "nay", title: "Vestido Nay", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049590/VERDE_QUADRADO_1_k0tfrt.png", videoId: "1166454610" },
  { id: "iris", title: "Conjunto Íris", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049592/CONJUNTO_RENATA_1_uu065u.png", videoId: "1166453580" },
  { id: "salles", title: "Conjunto Salles", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049593/DOURADO_QUADRADO_4_hvvt38.png", videoId: "1166454066" },
  { id: "scheila", title: "Conjunto Scheila", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049594/CONJUNTO_RENATA_2_lzujon.png", videoId: "1166453825" },
  { id: "estrella", title: "Vestido Estrella", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773049600/CONJUNTO_RENATA_4_wwqng8.png", videoId: "1166452653" },
  { id: "lorena", title: "Vestido Lorena", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773045925/lore_gs8pyo.jpg", videoId: "1166451621" },
  { id: "sol", title: "Vestido Sol", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047756/VEERDE_VERTICAL_pfatc6.png", videoId: "1166451054" },
  { id: "dubai", title: "Vestido Dubai", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047755/ROSA_VERTICAL_htrc2x.png", videoId: "1166456435" },
  { id: "lais", title: "Vestido Laís", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773047757/DOURADO_VERTICAL_rd6bem.png", videoId: "1166456340" },
  { id: "shirley", title: "Saída Shirley", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103640/XReZUJvzft0-HD_xd8fk4.jpg", videoId: "1165908374?h=954ee77336" },
  { id: "bella", title: "Vestido Bella", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103641/CONJUNTO_RENATA_10_xqzj0s.png", videoId: "1166450761" },
  { id: "brunnet", title: "Vestido Brunnet", thumbnail: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773103642/CONJUNTO_RENATA_11_u3f0vl.png", videoId: "1166456663" },
];

export const FeaturedCarousel = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Para o autoplay durante interação e retoma após 5s de inatividade
  useEffect(() => {
    if (!api) return;

    const autoplayPlugin = api.plugins()?.autoplay as any;
    if (!autoplayPlugin) return;

    const scheduleResume = () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        autoplayPlugin.play();
      }, 3500);
    };

    // Para quando o usuário começa a arrastar
    const onPointerDown = () => {
      autoplayPlugin.stop();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    // Agenda retomada quando solta
    const onPointerUp = () => {
      scheduleResume();
    };

    const onSettle = () => {
      if (!autoplayPlugin.isPlaying()) {
        scheduleResume();
      }
    };

    const rootNode = api.rootNode();
    rootNode.addEventListener("pointerdown", onPointerDown);
    rootNode.addEventListener("pointerup", onPointerUp);
    api.on("settle", onSettle);

    return () => {
      rootNode.removeEventListener("pointerdown", onPointerDown);
      rootNode.removeEventListener("pointerup", onPointerUp);
      api.off("settle", onSettle);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [api]);

  const handlePlay = () => {
    navigate('/vestidos-croche');
  };

  return (
    <div className="relative">
      {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            playOnInit: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {allModuleVideos.map((video) => (
            <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-full md:basis-4/5 lg:basis-3/4">
              <div 
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
                onClick={() => handlePlay()}
              >
                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 animate-pulse-slow">
                    <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-current ml-0.5" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center">
                  <h3 className="text-white text-sm md:text-lg font-semibold drop-shadow-lg">
                    {video.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm mt-0.5">
                    Clique para assistir
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-2 md:left-4 bg-black/60 hover:bg-black/80 border-white/20 text-white shadow-lg" />
        <CarouselNext className="right-2 md:right-4 bg-black/60 hover:bg-black/80 border-white/20 text-white shadow-lg" />
      </Carousel>

      {/* Carousel Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {shuffledVideos.map((video) => (
          <div
            key={video.id}
            className="w-2 h-2 rounded-full bg-primary/30 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};