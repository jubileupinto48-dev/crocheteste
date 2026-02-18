import { useState, useEffect } from "react";
import { Play, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Custom thumbnails for videos whose YouTube thumbnails are unavailable
const customThumbnails: Record<string, string> = {
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
  "QmMtlJu0cTI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "cCFOGukAh-Y": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "1q8PAEcytMk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "MV86APDdJrE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/Pxiscx0QsCE-HD_vgc3vg.jpg",
  "WPavNu7xI_o": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/Pxiscx0QsCE-HD_vgc3vg.jpg",
  "esZk0CWJPxw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "RFPdFNMXSxo": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "d1DB5J1cHmk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "3GLLTdColiE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "Mx4tkT0Qyew": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "g4oWC8uHiY4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "RWGTCFU8GjM": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "23pELsHCpw0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/ufx3WuaI9OA-HD_eqphem.jpg",
  "kEfX4uBE8_w": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/e7ud56CxnFg-HD_zkxaox.jpg",
  "QMuwadztjHk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/vSmgk4ZLpnk-HD_pi9wvu.jpg",
  "qTFQF2JuxMY": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/Kyx_qC1X7n8-HD_htvsx9.jpg",
  "fm3XUSkCy3c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "5zNb43Hi7MQ": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "kUM9BDOY2B4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "7BuqNEXwXKw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/751Ukhdt-ek-HD_oxpxw3.jpg",
  "rhmemKGV9N8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/751Ukhdt-ek-HD_oxpxw3.jpg",
  "P0Emfo_2qsU": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/v-BUiu4uwg4-HD_waluwn.jpg",
  "o0Txp_D4c1M": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/F-9MR785gNY-HD_kikzd5.jpg",
  "gF4LIZrQIQw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/F-9MR785gNY-HD_kikzd5.jpg",
  "IXkkWfjBD_A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/yZUAkvXZ4jc-HD_epymh7.jpg",
  "W6NReaWkX-4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/Byf4O1RD65s-HD_fvvbon.jpg",
  "vygTLCKLTyI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/ymNF5gXSCg0-HD_o5bvp3.jpg",
  "vhJm0SkK0pI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/ymNF5gXSCg0-HD_o5bvp3.jpg",
  // === VIMEO THUMBNAILS ===
  "1165877185?h=ce49de91b5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771383895/VEERDE_VERTICAL_1_wzahng.png",
  "1165822436?h=73db5fd949": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_VIRGINIA_y1pnbp.png",
  "1165822491?h=426a5c76b5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_VIRGINIA_y1pnbp.png",
  "1165822536?h=494836d768": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_ANGEL_bxkj7y.png",
  "1165822336?h=b2524c1a00": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_ANGEL_bxkj7y.png",
  "1165822633?h=9a932be1b8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_ANGEL_bxkj7y.png",
  "1165822238?h=798063ee5e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SAIDA_MEL_MAIA_o6g04n.png",
  "1165822696?h=58d1366209": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SAIDA_MEL_MAIA_o6g04n.png",
  "1165822301?h=88af25dec4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_MARIA_psu7sl.png",
  "1165822154?h=5ec6b1f8af": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_MARIA_psu7sl.png",
  "1165822389?h=7d4dceda8d": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_MARIA_psu7sl.png",
  "1165823703?h=f2563c95af": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  "1165823637?h=be2694c569": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  "1165823010?h=773cd6f91e": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  "1165824039?h=b270eff1a3": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_JULIANA_PAES_tzttax.png",
  "1165823422?h=3bad21440c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/CAL%C3%87A_CORRENTINHA_gfgtky.png",
  "1165823210?h=b5372b698b": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CAL%C3%87A_TELA_iqybjm.png",
  "1165823127?h=80846c06c2": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_PAETE_revqdb.png",
  "1165823296?h=588db44c04": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CROPPED_ANNA_CLARA_x9vxf8.png",
  "1165823492?h=049b68c02a": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_GABI_xdph48.png",
  "1165823953?h=6133197ea0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_GABI_xdph48.png",
  "1165823551?h=e845f3f59b": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CONJUNTO_GABI_xdph48.png",
  "1165823586?h=95ae5df629": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/CONJUNTO_FRANJAS_j12exw.png",
  "1165823379?h=de1eeffff5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/CONJUNTO_FRANJAS_j12exw.png",
  "1165823777?h=2148619f8b": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/SAIA_LAURA_ijd79k.png",
  "1165823890?h=8a3a44f1d3": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_PATRICIA_frmvo7.png",
  "1165823819?h=d5bbc1ab0f": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_PATRICIA_frmvo7.png",
  "1165826517?h=288eec92f1": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_SOPHIA_wteqz7.png",
  "1165826035?h=8dbfaef2b0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_MOANA_lv1a3z.png",
  "1165827065?h=0540e2af34": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_VANESSA_hwbdc8.png",
  "1165826296?h=8c5f4f7cfb": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_VANESSA_hwbdc8.png",
  "1165826387?h=9cf52087de": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_VANESSA_hwbdc8.png",
  "1165826807?h=56f86f1de4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_VANDA_xgcc3d.png",
  "1165826908?h=cf3b0678ab": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/BIQUINI_EVA_crun7w.png",
  "1165826996?h=639389fcf0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/SAIA_AMANDA_xo6sar.png",
  "1165826717?h=fd78660abf": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_BEL_ljtxn1.png",
  "1165826152?h=d563f325dc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/VESTIDO_BEL_ljtxn1.png",
  "1165825953?h=b67785daa5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CROPPED_DUDA_thz0po.png",
  "1165826240?h=bb6309f319": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_MARINA_qltofi.png",
  "1165825869?h=8858cf55a6": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_MARINA_qltofi.png",
  "1165825235?h=e65562ca75": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_ANA_PAULA_cqjakj.png",
  "1165825126?h=78b247f600": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_ANA_PAULA_cqjakj.png",
  "1165825817?h=a8a15760a4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_ANA_PAULA_cqjakj.png",
  "1165825489?h=4953414a7c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/CONJUNTO_LISI_h1slto.png",
  "1165825673?h=fb8f804677": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/CONJUNTO_LISI_h1slto.png",
  "1165825423?h=8cfc5ddc23": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/SAIA_NINA_nughgu.png",
  "1165825582?h=f833fa35d1": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381442/VESTIDO_ANA_nfzd2w.png",
  "1165825327?h=6fcce5e502": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_YARA_dqirvc.png",
  "1165825757?h=00739caa67": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381440/VESTIDO_YARA_dqirvc.png",
  "1165867234?h=6e2eed84e2": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/CONJUNTO_LETICIA_rtxkh0.png",
  "1165827131?h=c55fa2bddb": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771387377/DOURADO_QUADRADO_9_dlvqnp.png",
  "1165827332?h=75278547ee": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771387377/DOURADO_QUADRADO_9_dlvqnp.png",
  "1165824975?h=29ac896d60": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771387377/DOURADO_QUADRADO_9_dlvqnp.png",
  "1165828828?h=a4c932ccd4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_NALA_rorfhm.png",
  "1165829077?h=2e1fffbb63": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381438/VESTIDO_NALA_rorfhm.png",
  "1165828975?h=b2f003a62f": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381436/MACAC%C3%83O_GRASSI_v5fawd.png",
  "1165829345?h=67f801752d": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381436/MACAC%C3%83O_GRASSI_v5fawd.png",
  "1165829840?h=bda1e8e5be": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SU%C3%89TER_SOFIA_zrjpji.png",
  "1165828330?h=b9b9868fd2": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SU%C3%89TER_SOFIA_zrjpji.png",
  "1165829701?h=c3dde6b38a": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_LARISSA_dn0bln.png",
  "1165829124?h=f7f7193ac1": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_LARISSA_dn0bln.png",
  "1165829571?h=8d15bdff7a": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/VESTIDO_LARISSA_dn0bln.png",
  "1165828668?h=95dd4603c4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CROPPED_LOLA_hht4ad.png",
  "1165828774?h=0add065419": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
  "1165828605?h=58d11062d4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
  "1165828438?h=456ae1cdb5": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
  "1165828229?h=4acb08a378": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381437/CONJJUNTO_CALI_vv1sqv.png",
};

interface CustomVideoPlayerProps {
  videoId: string;
  title: string;
  platform?: "youtube" | "vimeo" | "gdrive";
  autoplay?: boolean;
  showPixMessage?: boolean;
}

export const CustomVideoPlayer = ({ videoId, title, platform = "youtube", autoplay = false, showPixMessage = false }: CustomVideoPlayerProps) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [showingPixOverlay, setShowingPixOverlay] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const { toast } = useToast();

  // Reset states when video changes
  useEffect(() => {
    setShowingPixOverlay(false);
    setPixCopied(false);
    setIsPlayingInline(false);
    setIsPlayingModal(false);
  }, [videoId]);

  const pixKey = "21965328868";

  const getThumbnailUrl = () => {
    if (customThumbnails[videoId]) {
      return customThumbnails[videoId];
    }
    if (platform === "youtube") {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    if (platform === "gdrive") {
      return `https://drive.google.com/thumbnail?id=${videoId}&sz=w1280`;
    }
    return `https://vumbnail.com/${videoId}.jpg`;
  };

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;
    }
    if (platform === "gdrive") {
      return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    const separator = videoId.includes('?') ? '&' : '?';
    return `https://player.vimeo.com/video/${videoId}${separator}autoplay=1`;
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setPixCopied(true);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave foi copiada para a área de transferência.",
    });
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handlePlay = () => {
    if (showPixMessage) {
      setShowingPixOverlay(true);
      return;
    }
    if (autoplay) {
      setIsPlayingInline(true);
    } else {
      setIsPlayingModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsPlayingModal(false);
  };

  // Inline playing mode
  if (isPlayingInline) {
    return (
      <Card className="overflow-hidden shadow-card">
        <div className="relative aspect-video bg-black">
          <iframe
            src={getEmbedUrl()}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>
    );
  }

  return (
    <>
      {/* Video Modal Overlay */}
      {isPlayingModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
              onClick={handleCloseModal}
            >
              <X className="w-6 h-6" />
            </Button>
            <iframe
              src={getEmbedUrl()}
              title={title}
              className="w-full h-full rounded-xl shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Thumbnail with Play Button */}
      <Card className="overflow-hidden shadow-card">
        <div 
          className="relative aspect-video md:aspect-video aspect-[4/3] bg-muted cursor-pointer group"
          onClick={handlePlay}
        >
          {!thumbnailLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <img
            src={getThumbnailUrl()}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              thumbnailLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            onLoad={() => setThumbnailLoaded(true)}
            onError={(e) => {
              if (platform === "youtube" && !customThumbnails[videoId]) {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Play Button - only show when NOT showing PIX overlay */}
          {!showingPixOverlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-destructive/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-destructive animate-pulse-slow">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-current ml-0.5" />
              </div>
            </div>
          )}

          {/* PIX Overlay - appears on top when user clicks play */}
          {showingPixOverlay && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8 text-center z-10 animate-fade-in">
              <p className="text-white text-sm md:text-lg font-medium leading-relaxed max-w-md mb-4 md:mb-6">
                Me envie o comprovante no WhatsApp para a liberação imediata dos vídeos ❤️
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 mb-3 md:mb-4">
                <p className="text-white/80 text-xs md:text-sm mb-1">Pix: Celular</p>
                <code className="font-mono text-base md:text-xl font-bold text-white">{pixKey}</code>
                <p className="text-white/70 text-xs md:text-sm mt-1">Lucas Morone (Meu filho)</p>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  copyPixKey();
                }}
                size="sm"
                className="gap-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                {pixCopied ? <Check className="w-4 h-4 animate-scale-in" /> : <Copy className="w-4 h-4" />}
                {pixCopied ? "Copiado!" : "Copiar Chave PIX"}
              </Button>
            </div>
          )}

          {/* Title Overlay - only show when NOT showing PIX overlay */}
          {!showingPixOverlay && (
            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
              <h3 className="text-white text-xs md:text-sm font-medium drop-shadow-lg line-clamp-2">
                {title}
              </h3>
              <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
                Clique para assistir
              </p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
