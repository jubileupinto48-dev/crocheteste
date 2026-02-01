import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import AI-generated dress images
import vestidoAngelPreview from "@/assets/vestidos/vestido-angel-preview.jpg";
import vestidoAngelDiagram from "@/assets/vestidos/vestido-angel-diagram.jpg";
import saidaMelMaiaPreview from "@/assets/vestidos/saida-mel-maia-preview.jpg";
import saidaMelMaiaDiagram from "@/assets/vestidos/saida-mel-maia-diagram.jpg";
import vestidoMariaPreview from "@/assets/vestidos/vestido-maria-preview.jpg";
import vestidoMariaDiagram from "@/assets/vestidos/vestido-maria-diagram.jpg";
import vestidoJulianaPaesPreview from "@/assets/vestidos/vestido-juliana-paes-preview.jpg";
import vestidoJulianaPaesDiagram from "@/assets/vestidos/vestido-juliana-paes-diagram.jpg";

// Map of project names to their graphics
const projectGraphics: Record<string, { preview: string; diagram: string }> = {
  "Vestido Angel": { preview: vestidoAngelPreview, diagram: vestidoAngelDiagram },
  "Saída Mel Maia": { preview: saidaMelMaiaPreview, diagram: saidaMelMaiaDiagram },
  "Vestido Maria": { preview: vestidoMariaPreview, diagram: vestidoMariaDiagram },
  "Vestido Juliana Paes": { preview: vestidoJulianaPaesPreview, diagram: vestidoJulianaPaesDiagram },
};
const VestidosCroche = () => {
  const videos = [
    // ===== DESTAQUES PRINCIPAIS =====
    { id: 1, title: "Vestido Destaque 1", videoId: "wa2xHd3ghg8", project: "Destaque", part: null },
    { id: 2, title: "Vestido Destaque 2", videoId: "MqT6DfpAGfE", project: "Destaque", part: null },
    { id: 3, title: "Vestido Destaque 3", videoId: "T3mKfEMGzpE", project: "Destaque", part: null },
    { id: 4, title: "Vestido Destaque 4", videoId: "7Ry1SQfBs-A", project: "Destaque", part: null },
    
    // ===== NOVOS VÍDEOS =====
    { id: 200, title: "Vestido Destaque 5", videoId: "2QG0PHbGUsI", project: "Destaque", part: null },
    { id: 201, title: "Vestido Destaque 6", videoId: "y9C56mdmG6A", project: "Destaque", part: null },
    { id: 202, title: "Vestido Destaque 7", videoId: "4y5JnM6CAKE", project: "Destaque", part: null },
    { id: 203, title: "Vestido Destaque 8", videoId: "CNe-elk8zm4", project: "Destaque", part: null },
    
    // ===== DESTAQUES =====
    // Vestido Angel (3 partes)
    { id: 5, title: "Vestido Angel - Parte 1", videoId: "QmMtlJu0cTI", project: "Vestido Angel", part: 1 },
    { id: 6, title: "Vestido Angel - Parte 2", videoId: "cCFOGukAh-Y", project: "Vestido Angel", part: 2 },
    { id: 7, title: "Vestido Angel - Parte 3", videoId: "1q8PAEcytMk", project: "Vestido Angel", part: 3 },
    
    // Saída Mel Maia (2 partes)
    { id: 8, title: "Saída Mel Maia - Parte 1", videoId: "MV86APDdJrE", project: "Saída Mel Maia", part: 1 },
    { id: 9, title: "Saída Mel Maia - Parte 2", videoId: "WPavNu7xI_o", project: "Saída Mel Maia", part: 2 },
    
    // Vestido Maria (3 partes)
    { id: 10, title: "Vestido Maria - Parte 1", videoId: "esZk0CWJPxw", project: "Vestido Maria", part: 1 },
    { id: 11, title: "Vestido Maria - Parte 2", videoId: "RFPdFNMXSxo", project: "Vestido Maria", part: 2 },
    { id: 12, title: "Vestido Maria - Parte 3", videoId: "d1DB5J1cHmk", project: "Vestido Maria", part: 3 },
    
    // Vestido Juliana Paes (4 partes)
    { id: 13, title: "Vestido Juliana Paes - Parte 1", videoId: "3GLLTdColiE", project: "Vestido Juliana Paes", part: 1 },
    { id: 14, title: "Vestido Juliana Paes - Parte 2", videoId: "Mx4tkT0Qyew", project: "Vestido Juliana Paes", part: 2 },
    { id: 15, title: "Vestido Juliana Paes - Parte 3", videoId: "g4oWC8uHiY4", project: "Vestido Juliana Paes", part: 3 },
    { id: 16, title: "Vestido Juliana Paes - Parte 4", videoId: "RWGTCFU8GjM", project: "Vestido Juliana Paes", part: 4 },
    
    // ===== OUTROS PROJETOS =====
    // Calça Crochê Correntinha
    { id: 17, title: "Calça Crochê Correntinha", videoId: "23pELsHCpw0", project: "Calça Crochê Correntinha", part: null },
    
    // Calça de Crochê Tela
    { id: 18, title: "Calça de Crochê Tela", videoId: "kEfX4uBE8_w", project: "Calça de Crochê Tela", part: null },
    
    // Conjunto de Crochê com paetê
    { id: 19, title: "Conjunto de Crochê com Paetê de Acrílico Espelhado", videoId: "QMuwadztjHk", project: "Conjunto Paetê", part: null },
    
    // Cropped Ana Clara
    { id: 20, title: "Cropped Ana Clara", videoId: "qTFQF2JuxMY", project: "Cropped Ana Clara", part: null },
    
    // Conjunto Gabi (3 partes)
    { id: 21, title: "Conjunto Gabi - Parte 1", videoId: "fm3XUSkCy3c", project: "Conjunto Gabi", part: 1 },
    { id: 22, title: "Conjunto Gabi - Parte 2", videoId: "5zNb43Hi7MQ", project: "Conjunto Gabi", part: 2 },
    { id: 23, title: "Conjunto Gabi - Parte 3", videoId: "kUM9BDOY2B4", project: "Conjunto Gabi", part: 3 },
    
    // Conjunto Franjas (2 partes)
    { id: 24, title: "Conjunto Franjas - Parte 1", videoId: "7BuqNEXwXKw", project: "Conjunto Franjas", part: 1 },
    { id: 25, title: "Conjunto Franjas - Parte 2", videoId: "rhmemKGV9N8", project: "Conjunto Franjas", part: 2 },
    
    // Saia Laura
    { id: 26, title: "Saia Laura", videoId: "P0Emfo_2qsU", project: "Saia Laura", part: null },
    
    // Vestido Patricia (2 partes)
    { id: 27, title: "Vestido Patricia - Parte 1", videoId: "o0Txp_D4c1M", project: "Vestido Patricia", part: 1 },
    { id: 28, title: "Vestido Patricia - Parte 2", videoId: "gF4LIZrQIQw", project: "Vestido Patricia", part: 2 },
    
    // Vestido Sophia
    { id: 29, title: "Vestido Sophia", videoId: "IXkkWfjBD_A", project: "Vestido Sophia", part: null },
    
    // Vestido Moana
    { id: 30, title: "Vestido Moana", videoId: "W6NReaWkX-4", project: "Vestido Moana", part: null },
    
    // Vestido Vanessa (3 partes)
    { id: 31, title: "Vestido Vanessa - Parte 1", videoId: "vygTLCKLTyI", project: "Vestido Vanessa", part: 1 },
    { id: 32, title: "Vestido Vanessa - Parte 2", videoId: "vhJm0SkK0pI", project: "Vestido Vanessa", part: 2 },
    { id: 33, title: "Vestido Vanessa - Parte 3", videoId: "2HnnZJQknxo", project: "Vestido Vanessa", part: 3 },
    
    // Vestido Vanda
    { id: 34, title: "Vestido Vanda", videoId: "atPZOkilT3E", project: "Vestido Vanda", part: null },
    
    // Biquini Eva
    { id: 35, title: "Biquíni Eva", videoId: "3SclyOpltZY", project: "Biquíni Eva", part: null },
    
    // Saia Amanda
    { id: 36, title: "Saia Amanda", videoId: "nTGYxzVaMPY", project: "Saia Amanda", part: null },
    
    // Vestido Bel (2 partes)
    { id: 37, title: "Vestido Bel - Parte 1", videoId: "xj3hnYfdrNk", project: "Vestido Bel", part: 1 },
    { id: 38, title: "Vestido Bel - Parte 2", videoId: "AADIV-AOdvg", project: "Vestido Bel", part: 2 },
    
    // Cropped Duda
    { id: 39, title: "Cropped Duda", videoId: "mE-dHVyvqcE", project: "Cropped Duda", part: null },
    
    // Vestido Marina (2 partes)
    { id: 40, title: "Vestido Marina - Parte 1", videoId: "C957amxwu-Q", project: "Vestido Marina", part: 1 },
    { id: 41, title: "Vestido Marina - Parte 2", videoId: "_WpirLo1zSo", project: "Vestido Marina", part: 2 },
    
    // Vestido Ana Paula (4 partes)
    { id: 42, title: "Vestido Ana Paula - Parte 1", videoId: "SJokhYU5TLU", project: "Vestido Ana Paula", part: 1 },
    { id: 43, title: "Vestido Ana Paula - Parte 2", videoId: "BOA1BJztukI", project: "Vestido Ana Paula", part: 2 },
    { id: 44, title: "Vestido Ana Paula - Parte 3", videoId: "AMQY7A2jP_A", project: "Vestido Ana Paula", part: 3 },
    { id: 45, title: "Vestido Ana Paula - Parte 4", videoId: "_3a57tDzcXQ", project: "Vestido Ana Paula", part: 4 },
    
    // Conjunto Lisi (2 partes)
    { id: 46, title: "Conjunto Lisi - Parte 1", videoId: "mANxt1_-pOs", project: "Conjunto Lisi", part: 1 },
    { id: 47, title: "Conjunto Lisi - Parte 2", videoId: "2VEqAPlZmPw", project: "Conjunto Lisi", part: 2 },
    
    // Saia Nina
    { id: 48, title: "Saia Nina", videoId: "_ykov0rTYJI", project: "Saia Nina", part: null },
    
    // Vestido Ana
    { id: 49, title: "Vestido Ana", videoId: "m3_1jw04ejo", project: "Vestido Ana", part: null },
    
    // Vestido Yara (2 partes)
    { id: 50, title: "Vestido Yara - Parte 1", videoId: "zKuJUuEcRyw", project: "Vestido Yara", part: 1 },
    { id: 51, title: "Vestido Yara - Parte 2", videoId: "wv6UEXc8SH0", project: "Vestido Yara", part: 2 },
    
    // Conjunto Letícia
    { id: 52, title: "Conjunto Letícia", videoId: "3RS09kjuVuA", project: "Conjunto Letícia", part: null },
    
    // Conjunto Lore (5 partes)
    { id: 53, title: "Conjunto Lore - Parte 1", videoId: "PAPz5f9o55U", project: "Conjunto Lore", part: 1 },
    { id: 54, title: "Conjunto Lore - Parte 2", videoId: "m8oFjAqpK-s", project: "Conjunto Lore", part: 2 },
    { id: 55, title: "Conjunto Lore - Parte 3", videoId: "9a-u0Fsp_q4", project: "Conjunto Lore", part: 3 },
    { id: 56, title: "Conjunto Lore - Parte 4", videoId: "R97m7OREsmY", project: "Conjunto Lore", part: 4 },
    { id: 57, title: "Conjunto Lore - Parte 5", videoId: "umn9tQ1n0lg", project: "Conjunto Lore", part: 5 },
    
    // Vestido Nala (2 partes)
    { id: 58, title: "Vestido Nala - Parte 1", videoId: "rTEQcitKu_A", project: "Vestido Nala", part: 1 },
    { id: 59, title: "Vestido Nala - Parte 2", videoId: "5MWxPBVyT8Y", project: "Vestido Nala", part: 2 },
    
    // Macacão Grassi (2 partes)
    { id: 60, title: "Macacão Grassi - Parte 1", videoId: "_fhKtLIQJ88", project: "Macacão Grassi", part: 1 },
    { id: 61, title: "Macacão Grassi - Parte 2", videoId: "498muKXS9Pw", project: "Macacão Grassi", part: 2 },
    
    
    // Suéter Sofia (2 partes)
    { id: 62, title: "Suéter Sofia - Parte 1", videoId: "btJKMwI02kA", project: "Suéter Sofia", part: 1 },
    { id: 63, title: "Suéter Sofia - Parte 2", videoId: "Yavxmgsl7Hc", project: "Suéter Sofia", part: 2 },
    
    // Vestido Larissa (3 partes)
    { id: 64, title: "Vestido Larissa - Parte 1", videoId: "tagRcIE3Rm0", project: "Vestido Larissa", part: 1 },
    { id: 65, title: "Vestido Larissa - Parte 2", videoId: "lGllIFXHtB0", project: "Vestido Larissa", part: 2 },
    { id: 66, title: "Vestido Larissa - Parte 3", videoId: "f0_T20Zf0Gw", project: "Vestido Larissa", part: 3 },
    
    // Cropped Lolla
    { id: 67, title: "Cropped Lolla", videoId: "Gp2NpNQMNVI", project: "Cropped Lolla", part: null },
    
    // Conjunto Cali (4 partes)
    { id: 68, title: "Conjunto Cali - Parte 1", videoId: "Y-HlS3HnIL0", project: "Conjunto Cali", part: 1 },
    { id: 69, title: "Conjunto Cali - Parte 2", videoId: "wgNmrCWnjYo", project: "Conjunto Cali", part: 2 },
    { id: 70, title: "Conjunto Cali - Parte 3", videoId: "KZect7nHK3I", project: "Conjunto Cali", part: 3 },
    { id: 71, title: "Conjunto Cali - Parte 4", videoId: "Eq5gYpk_U4k", project: "Conjunto Cali", part: 4 },
    
    // Vestido Patricia Poeta (3 partes)
    { id: 72, title: "Vestido Patricia Poeta - Parte 1", videoId: "9e8IMdIJWdE", project: "Vestido Patricia Poeta", part: 1 },
    { id: 73, title: "Vestido Patricia Poeta - Parte 2", videoId: "yU5TkTe5m1Y", project: "Vestido Patricia Poeta", part: 2 },
    { id: 74, title: "Vestido Patricia Poeta - Parte 3", videoId: "OhMGhWsXxok", project: "Vestido Patricia Poeta", part: 3 },
    
    // Conjunto Zelly (3 partes)
    { id: 75, title: "Conjunto Zelly - Parte 1", videoId: "jxe4-eZwGwQ", project: "Conjunto Zelly", part: 1 },
    { id: 76, title: "Conjunto Zelly - Parte 2", videoId: "Z6viihH1OHw", project: "Conjunto Zelly", part: 2 },
    { id: 77, title: "Conjunto Zelly - Parte 3", videoId: "rXHydF8r2yU", project: "Conjunto Zelly", part: 3 },
    
    // Cropped Livia
    { id: 78, title: "Cropped Livia", videoId: "QfJUjcU7ZTU", project: "Cropped Livia", part: null },
    
    // Vestido Alice (2 partes)
    { id: 79, title: "Vestido Alice - Parte 1", videoId: "tXYVzevsCEA", project: "Vestido Alice", part: 1 },
    { id: 80, title: "Vestido Alice - Parte 2", videoId: "UEZOTs4Bjw0", project: "Vestido Alice", part: 2 },
    
    // Conjunto Renata (2 partes)
    { id: 81, title: "Conjunto Renata - Parte 1", videoId: "mpwaRW5yMXc", project: "Conjunto Renata", part: 1 },
    { id: 82, title: "Conjunto Renata - Parte 2", videoId: "-Iu0FaXkuAo", project: "Conjunto Renata", part: 2 },
    
    // Vestido Ana (segundo)
    { id: 83, title: "Vestido Ana II", videoId: "EBHjI1mVKxA", project: "Vestido Ana II", part: null },
    
    // Vestido Lari (3 partes)
    { id: 84, title: "Vestido Lari - Parte 1", videoId: "tsWy6DxF14M", project: "Vestido Lari", part: 1 },
    { id: 85, title: "Vestido Lari - Parte 2", videoId: "Thn0KVRjcok", project: "Vestido Lari", part: 2 },
    { id: 86, title: "Vestido Lari - Parte 3", videoId: "piaFF1nlxso", project: "Vestido Lari", part: 3 },
    
    // Vestido Nay (2 partes)
    { id: 87, title: "Vestido Nay - Parte 1", videoId: "hWpuYeic9Cw", project: "Vestido Nay", part: 1 },
    { id: 88, title: "Vestido Nay - Parte 2", videoId: "0lqNycXsXWE", project: "Vestido Nay", part: 2 },
    
    // Vestido Yara (segundo)
    { id: 89, title: "Vestido Yara II", videoId: "ORapj3rePNs", project: "Vestido Yara II", part: null },
    
    // Conjunto Íris (2 partes)
    { id: 90, title: "Conjunto Íris - Parte 1", videoId: "YtLjwU-Db2w", project: "Conjunto Íris", part: 1 },
    { id: 91, title: "Conjunto Íris - Parte 2", videoId: "7K0_9wxdMvo", project: "Conjunto Íris", part: 2 },
    
    // Conjunto Salles (3 partes)
    { id: 92, title: "Conjunto Salles - Parte 1", videoId: "cUqJUYwBa5Q", project: "Conjunto Salles", part: 1 },
    { id: 93, title: "Conjunto Salles - Parte 2", videoId: "Ty-OoJH-C3M", project: "Conjunto Salles", part: 2 },
    { id: 94, title: "Conjunto Salles - Parte 3", videoId: "GzBaR84iQsE", project: "Conjunto Salles", part: 3 },
    
    // Conjunto Scheila (2 partes)
    { id: 95, title: "Conjunto Scheila - Parte 1", videoId: "xv2dowFOhO0", project: "Conjunto Scheila", part: 1 },
    { id: 96, title: "Conjunto Scheila - Parte 2", videoId: "RAR1S3ES-kA", project: "Conjunto Scheila", part: 2 },
    
    // Cropped Angel
    { id: 97, title: "Cropped Angel", videoId: "t4AI9uTrVts", project: "Cropped Angel", part: null },
    
    // Cropped Anitta
    { id: 98, title: "Cropped Anitta", videoId: "40gsEHSnbJY", project: "Cropped Anitta", part: null },
    
    // Cropped Maré
    { id: 99, title: "Cropped Maré", videoId: "3XGhrDxunQ0", project: "Cropped Maré", part: null },
    
    // Vestido Estrella (2 partes)
    { id: 100, title: "Vestido Estrella - Parte 1", videoId: "WljMCbcNS5E", project: "Vestido Estrella", part: 1 },
    { id: 101, title: "Vestido Estrella - Parte 2", videoId: "SbWlKS41gkw", project: "Vestido Estrella", part: 2 },
    
    // Vestido Lore (4 partes)
    { id: 102, title: "Vestido Lore - Parte 1", videoId: "t53TD8lwI14", project: "Vestido Lore", part: 1 },
    { id: 103, title: "Vestido Lore - Parte 2", videoId: "MA7_cOiRg7E", project: "Vestido Lore", part: 2 },
    { id: 104, title: "Vestido Lore - Parte 3", videoId: "MJE5_uAo26k", project: "Vestido Lore", part: 3 },
    { id: 105, title: "Vestido Lore - Parte 4", videoId: "NfjrvIXu5uE", project: "Vestido Lore", part: 4 },
    
    // Vestido Gaia (2 partes)
    { id: 106, title: "Vestido Gaia - Parte 1", videoId: "NvNkvz1Wp_I", project: "Vestido Gaia", part: 1 },
    { id: 107, title: "Vestido Gaia - Parte 2", videoId: "hcYeXZs023I", project: "Vestido Gaia", part: 2 },
    
    // Vestido Yasmin (3 partes)
    { id: 108, title: "Vestido Yasmin - Parte 1", videoId: "tHbOidDsGgw", project: "Vestido Yasmin", part: 1 },
    { id: 109, title: "Vestido Yasmin - Parte 2", videoId: "Coxx_IZvUIY", project: "Vestido Yasmin", part: 2 },
    { id: 110, title: "Vestido Yasmin - Parte 3", videoId: "0qdMe4MV9yM", project: "Vestido Yasmin", part: 3 },
    
    // Conjunto Suri (5 partes)
    { id: 111, title: "Conjunto Suri - Parte 1", videoId: "jdz_X69RGlo", project: "Conjunto Suri", part: 1 },
    { id: 112, title: "Conjunto Suri - Parte 2", videoId: "3CxncyzC2pc", project: "Conjunto Suri", part: 2 },
    { id: 113, title: "Conjunto Suri - Parte 3", videoId: "8LT66fWB6LE", project: "Conjunto Suri", part: 3 },
    { id: 114, title: "Conjunto Suri - Parte 4", videoId: "2l8m8xx_Xd4", project: "Conjunto Suri", part: 4 },
    { id: 115, title: "Conjunto Suri - Parte 5", videoId: "I0MAot5zZYo", project: "Conjunto Suri", part: 5 },
    
    // Vestido Lorena (5 partes)
    { id: 116, title: "Vestido Lorena - Parte 1", videoId: "wYK9dr2ej8s", project: "Vestido Lorena", part: 1 },
    { id: 117, title: "Vestido Lorena - Parte 2", videoId: "uTQkwhhv-UQ", project: "Vestido Lorena", part: 2 },
    { id: 118, title: "Vestido Lorena - Parte 3", videoId: "imeIgdGRsyw", project: "Vestido Lorena", part: 3 },
    { id: 119, title: "Vestido Lorena - Parte 4", videoId: "gRsGLrTpxIM", project: "Vestido Lorena", part: 4 },
    { id: 120, title: "Vestido Lorena - Parte 5", videoId: "aGLzzwJkNeQ", project: "Vestido Lorena", part: 5 },
    
    // Bolsa de Crochê
    { id: 121, title: "Bolsa de Crochê", videoId: "VGk7GMxhrME", project: "Bolsa de Crochê", part: null },
    
    // Saída Rayssa (2 partes)
    { id: 122, title: "Saída Rayssa - Parte 1", videoId: "vu2MeYApu_A", project: "Saída Rayssa", part: 1 },
    { id: 123, title: "Saída Rayssa - Parte 2", videoId: "4UTIaRLbZ74", project: "Saída Rayssa", part: 2 },
    
    // Vestido Sol (3 partes)
    { id: 124, title: "Vestido Sol - Parte 1", videoId: "DIOCJ-HG5g4", project: "Vestido Sol", part: 1 },
    { id: 125, title: "Vestido Sol - Parte 2", videoId: "leIirPP43fA", project: "Vestido Sol", part: 2 },
    { id: 126, title: "Vestido Sol - Parte 3", videoId: "C0wJap6TzOo", project: "Vestido Sol", part: 3 },
    
    // Vestido Abacaxi (2 partes)
    { id: 127, title: "Vestido Abacaxi - Parte 1", videoId: "sBGHr6aSevQ", project: "Vestido Abacaxi", part: 1 },
    { id: 128, title: "Vestido Abacaxi - Parte 2", videoId: "s8e8lbmqYSY", project: "Vestido Abacaxi", part: 2 },
    
    // Vestido Bella (3 partes)
    { id: 129, title: "Vestido Bella - Parte 1", videoId: "CA2UaeVF4Kg", project: "Vestido Bella", part: 1 },
    { id: 130, title: "Vestido Bella - Parte 2", videoId: "DVqqw8Dcxxg", project: "Vestido Bella", part: 2 },
    { id: 131, title: "Vestido Bella - Parte 3", videoId: "0ci6lDnmWK4", project: "Vestido Bella", part: 3 },
    
    // Vestido e Cropped Julia (2 partes)
    { id: 132, title: "Vestido e Cropped Julia - Parte 1", videoId: "29b_BL-L0dw", project: "Vestido e Cropped Julia", part: 1 },
    { id: 133, title: "Vestido e Cropped Julia - Parte 2", videoId: "S6ekc5BgMqM", project: "Vestido e Cropped Julia", part: 2 },
    
    // Vestido Brunnet (3 partes)
    { id: 134, title: "Vestido Brunnet - Parte 1", videoId: "FN_OFnIJK_0", project: "Vestido Brunnet", part: 1 },
    { id: 135, title: "Vestido Brunnet - Parte 2", videoId: "Xc55DMK6q-s", project: "Vestido Brunnet", part: 2 },
    { id: 136, title: "Vestido Brunnet - Parte 3", videoId: "t9uTNN1DzvU", project: "Vestido Brunnet", part: 3 },
    
    // Conjunto Tamiris (2 partes)
    { id: 137, title: "Conjunto Tamiris - Parte 1", videoId: "wRGwVev34bk", project: "Conjunto Tamiris", part: 1 },
    { id: 138, title: "Conjunto Tamiris - Parte 2", videoId: "AjoW1enGcGk", project: "Conjunto Tamiris", part: 2 },
    
    // Vestido Anitta
    { id: 139, title: "Vestido Anitta", videoId: "vjdcTjhCOHI", project: "Vestido Anitta", part: null },
    
    // Cropped Amari
    { id: 140, title: "Cropped Amari", videoId: "8utWdn_DFgg", project: "Cropped Amari", part: null },
    
    // Cropped Tati
    { id: 141, title: "Cropped Tati", videoId: "oUrvkDdDdiU", project: "Cropped Tati", part: null },
    
    // Vestido Dubai
    { id: 142, title: "Vestido Dubai - Aula Parcelada", videoId: "i-55PjpIhtw", project: "Vestido Dubai", part: null },
    
    // Vestido Laís (3 partes)
    { id: 143, title: "Vestido Laís - Parte 1", videoId: "Ip8HhIZ-XTw", project: "Vestido Laís", part: 1 },
    { id: 144, title: "Vestido Laís - Parte 2", videoId: "XO4uMvRd2wg", project: "Vestido Laís", part: 2 },
    { id: 145, title: "Vestido Laís - Parte 3", videoId: "u4MrCZqnjLQ", project: "Vestido Laís", part: 3 },
    
    // Vestido Léa (2 partes)
    { id: 146, title: "Vestido Léa - Parte 1", videoId: "anqMDNT27Z4", project: "Vestido Léa", part: 1 },
    { id: 147, title: "Vestido Léa - Parte 2", videoId: "vFlPZpGLJ1U", project: "Vestido Léa", part: 2 },
    
    // Vestido de Crochê Infantil com Flores (2 partes)
    { id: 148, title: "Vestido Infantil com Flores - Parte 1", videoId: "JPxWe3bttUE", project: "Vestido Infantil Flores", part: 1 },
    { id: 149, title: "Vestido Infantil com Flores - Parte 2", videoId: "AJdQG3y5TvY", project: "Vestido Infantil Flores", part: 2 },
    
    // Saia Carneiros (2 partes)
    { id: 150, title: "Saia Carneiros - Parte 1", videoId: "v0GFZx3i5Dc", project: "Saia Carneiros", part: 1 },
    { id: 151, title: "Saia Carneiros - Parte 2", videoId: "rD06l4x5ot8", project: "Saia Carneiros", part: 2 },
    
    // Saída Sienna (4 partes)
    { id: 152, title: "Saída Sienna - Parte 1", videoId: "Q8_o19q7qkU", project: "Saída Sienna", part: 1 },
    { id: 153, title: "Saída Sienna - Parte 2", videoId: "v3KPfjM4rEU", project: "Saída Sienna", part: 2 },
    { id: 154, title: "Saída Sienna - Parte 3", videoId: "bzHs1bktTvs", project: "Saída Sienna", part: 3 },
    { id: 155, title: "Saída Sienna - Parte 4", videoId: "7UznYE_-Wjg", project: "Saída Sienna", part: 4 },
    
    // Vestido Celina (5 partes)
    { id: 156, title: "Vestido Celina - Parte 1", videoId: "2_LZiUijbcA", project: "Vestido Celina", part: 1 },
    { id: 157, title: "Vestido Celina - Parte 2", videoId: "tEFQR4v2lnU", project: "Vestido Celina", part: 2 },
    { id: 158, title: "Vestido Celina - Parte 3", videoId: "oGlf3rqwawI", project: "Vestido Celina", part: 3 },
    { id: 159, title: "Vestido Celina - Parte 4", videoId: "DDWCV3SPwLg", project: "Vestido Celina", part: 4 },
    { id: 160, title: "Vestido Celina - Parte 5", videoId: "tUrgpZiCJ90", project: "Vestido Celina", part: 5 },
    
    // Vestido Eduarda (4 partes)
    { id: 161, title: "Vestido Eduarda - Parte 1", videoId: "eo1Kr1DoOOo", project: "Vestido Eduarda", part: 1 },
    { id: 162, title: "Vestido Eduarda - Parte 2", videoId: "hTR7y32XKDY", project: "Vestido Eduarda", part: 2 },
    { id: 163, title: "Vestido Eduarda - Parte 3", videoId: "w_3fDMHVzhM", project: "Vestido Eduarda", part: 3 },
    { id: 164, title: "Vestido Eduarda - Parte 4", videoId: "Hi82e-EDTdg", project: "Vestido Eduarda", part: 4 },
    
    // Saída Dani (3 partes)
    { id: 165, title: "Saída Dani - Parte 1", videoId: "B4xhTJY_UyQ", project: "Saída Dani", part: 1 },
    { id: 166, title: "Saída Dani - Parte 2", videoId: "HQVLjo9_3sY", project: "Saída Dani", part: 2 },
    { id: 167, title: "Saída Dani - Parte 3", videoId: "wSuQxShxzNE", project: "Saída Dani", part: 3 },
    
    // Vestido Lollita (2 partes)
    { id: 168, title: "Vestido Lollita - Parte 1", videoId: "UtJlwdEklYQ", project: "Vestido Lollita", part: 1 },
    { id: 169, title: "Vestido Lollita - Parte 2", videoId: "l-MqIYIpOsM", project: "Vestido Lollita", part: 2 },
    
    // Vestido Barbados (3 partes)
    { id: 170, title: "Vestido Barbados - Parte 1", videoId: "KNH0RHLCb0s", project: "Vestido Barbados", part: 1 },
    { id: 171, title: "Vestido Barbados - Parte 2", videoId: "ZqRrV1-VW3A", project: "Vestido Barbados", part: 2 },
    { id: 172, title: "Vestido Barbados - Parte 3", videoId: "GSe98LWFD6I", project: "Vestido Barbados", part: 3 },
    
    // Batinha Chloe
    { id: 173, title: "Batinha Chloe", videoId: "a0nk3GoNm2Y", project: "Batinha Chloe", part: null },
    
    // Vestido Cecilia (7 partes)
    { id: 174, title: "Vestido Cecilia - Parte 1", videoId: "oPu4Z0IE3wY", project: "Vestido Cecilia", part: 1 },
    { id: 175, title: "Vestido Cecilia - Parte 2", videoId: "d5Tm8u7pwv8", project: "Vestido Cecilia", part: 2 },
    { id: 176, title: "Vestido Cecilia - Parte 3", videoId: "Wyp8Kpc_wks", project: "Vestido Cecilia", part: 3 },
    { id: 177, title: "Vestido Cecilia - Parte 4", videoId: "jteLa2xCVak", project: "Vestido Cecilia", part: 4 },
    { id: 178, title: "Vestido Cecilia - Parte 5", videoId: "iz3BFH14d-E", project: "Vestido Cecilia", part: 5 },
    { id: 179, title: "Vestido Cecilia - Parte 6", videoId: "S2O4ilYCOyA", project: "Vestido Cecilia", part: 6 },
    { id: 180, title: "Vestido Cecilia - Parte 7", videoId: "JSoJ5DIrqzE", project: "Vestido Cecilia", part: 7 },
    
    // Batinha Zoe
    { id: 181, title: "Batinha Zoe", videoId: "Y2pzWhLOPJE", project: "Batinha Zoe", part: null },
    
    // Biquíni Chalay (3 partes)
    { id: 182, title: "Biquíni Chalay - Parte 1", videoId: "TwqdE0XrQtw", project: "Biquíni Chalay", part: 1 },
    { id: 183, title: "Biquíni Chalay - Parte 2", videoId: "udU0xbBdy6A", project: "Biquíni Chalay", part: 2 },
    { id: 184, title: "Biquíni Chalay - Parte 3", videoId: "FhpLEq1oOW0", project: "Biquíni Chalay", part: 3 },
    
    // Vestido Ester (2 partes)
    { id: 185, title: "Vestido Ester - Parte 1", videoId: "aqVH4grJm-s", project: "Vestido Ester", part: 1 },
    { id: 186, title: "Vestido Ester - Parte 2", videoId: "DLtHowmmx5c", project: "Vestido Ester", part: 2 },
    
    // Bolsa Coral
    { id: 187, title: "Bolsa Coral", videoId: "dLiiKJD8PIc", project: "Bolsa Coral", part: null },
    
    // Conjunto Beatriz (3 partes)
    { id: 188, title: "Conjunto Beatriz - Parte 1", videoId: "sAVpo6GMWkY", project: "Conjunto Beatriz", part: 1 },
    { id: 189, title: "Conjunto Beatriz - Parte 2", videoId: "5rpkorXexRM", project: "Conjunto Beatriz", part: 2 },
    { id: 190, title: "Conjunto Beatriz - Parte 3", videoId: "KrbdPy8Ngjw", project: "Conjunto Beatriz", part: 3 },
    
    // Vestido Raquel (3 partes)
    { id: 191, title: "Vestido Raquel - Parte 1", videoId: "9cPmHxYPu_4", project: "Vestido Raquel", part: 1 },
    { id: 192, title: "Vestido Raquel - Parte 2", videoId: "Y6EjggUaPDI", project: "Vestido Raquel", part: 2 },
    { id: 193, title: "Vestido Raquel - Parte 3", videoId: "LAKfdeZ-uvw", project: "Vestido Raquel", part: 3 },
    
    // Conjunto Mia (2 partes)
    { id: 194, title: "Conjunto Mia - Parte 1", videoId: "JjrbPHVsB9c", project: "Conjunto Mia", part: 1 },
    { id: 195, title: "Conjunto Mia - Parte 2", videoId: "sahh4NQgAbE", project: "Conjunto Mia", part: 2 },
    
    // Vestido Celeste (4 partes)
    { id: 196, title: "Vestido Celeste - Parte 1", videoId: "knZxZwuhfNk", project: "Vestido Celeste", part: 1 },
    { id: 197, title: "Vestido Celeste - Parte 2", videoId: "mEq1bWNCW9Q", project: "Vestido Celeste", part: 2 },
    { id: 198, title: "Vestido Celeste - Parte 3", videoId: "BGEOGV6gz74", project: "Vestido Celeste", part: 3 },
    { id: 199, title: "Vestido Celeste - Parte 4", videoId: "k-d8mWx5j6o", project: "Vestido Celeste", part: 4 },
  ];

  // Extrair projetos únicos para o filtro
  const uniqueProjects = [...new Set(videos.map(v => v.project))];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const videoListRef = useRef<HTMLDivElement>(null);
  const videosPerPage = 12;

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Principal + Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mobile: Video player mais proeminente */}
            <div className="animate-fade-in">
              <div className="md:hidden">
                <div className="aspect-[4/3] sm:aspect-video">
                  <CustomVideoPlayer
                    videoId={currentVideo.videoId}
                    title={currentVideo.title}
                    platform="youtube"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <CustomVideoPlayer
                  videoId={currentVideo.videoId}
                  title={currentVideo.title}
                  platform="youtube"
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
                          thumbnail={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
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
                
                {/* Gráficos AI - Imagem do projeto e diagrama de pontos */}
                {projectGraphics[currentVideo.project] && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">IA</span>
                      Visualização do Projeto
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">Resultado Final</p>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-muted/30">
                          <img 
                            src={projectGraphics[currentVideo.project].preview} 
                            alt={`Preview do ${currentVideo.project}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">Diagrama de Pontos</p>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-white">
                          <img 
                            src={projectGraphics[currentVideo.project].diagram} 
                            alt={`Diagrama de pontos do ${currentVideo.project}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
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
