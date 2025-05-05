import {
  JaroLongText,
  BungeeLongText,
  SFProLongText,
  Jersey15LongText,
  GothamUltraLongText,
  PorkysLongText,
  EricaLongText,
  CalistogaLongText,
  KeaniaLongText,
  AdversalLongText,
  RozhaLongText,
  AventenaLongText,
  GaMaamliLongText,
  PoetsenLongText,
  SilkscreenLongText,
  HanaleiLongText,
  RacingSansLongText,
  BonbonLongText,
  WorkbenchLongText,
  NicoMojiLongText
} from '@/app/assets/Marquee/MarqueeLongText';

import {
  JaroShortText,
  BungeeShortText,
  SFProShortText,
  Jersey15ShortText,
  GothamUltraShortText,
  PorkysShortText,
  EricaShortText,
  CalistogaShortText,
  KeaniaShortText,
  AdversalShortText,
  RozhaShortText,
  AventenaShortText,
  GaMaamliShortText,
  PoetsenShortText,
  SilkscreenShortText,
  HanaleiShortText,
  RacingSansShortText,
  BonbonShortText,
  WorkbenchShortText,
  NicoMojiShortText
} from '@/app/assets/Marquee/MarqueeShortText';

interface CardLogoProps {
  fontFamily: string | undefined;
  accent?: string | undefined;
}

export function getMarqueeLongText({ fontFamily = 'Jaro', accent = '#530B67' }: CardLogoProps) {
  switch (fontFamily) {
    case 'Jaro':
      return <JaroLongText accent={accent} />;
    case 'Bungee':
      return <BungeeLongText accent={accent} />;
    case 'SF Pro':
      return <SFProLongText accent={accent} />;
    case 'Jersey 15':
      return <Jersey15LongText accent={accent} />;
    case 'Gotham Ultra':
      return <GothamUltraLongText accent={accent} />;
    case 'Porkys':
      return <PorkysLongText accent={accent} />;
    case 'Erica':
      return <EricaLongText accent={accent} />;
    case 'Calistoga':
      return <CalistogaLongText accent={accent} />;
    case 'Keania':
      return <KeaniaLongText accent={accent} />;
    case 'Adversal':
      return <AdversalLongText accent={accent} />;
    case 'Rozha':
      return <RozhaLongText accent={accent} />;
    case 'Aventena':
      return <AventenaLongText accent={accent} />;
    case 'Ga Maamli':
      return <GaMaamliLongText accent={accent} />;
    case 'Poetsen':
      return <PoetsenLongText accent={accent} />;
    case 'Silkscreen':
      return <SilkscreenLongText accent={accent} />;
    case 'Hanalei':
      return <HanaleiLongText accent={accent} />;
    case 'Racing Sans':
      return <RacingSansLongText accent={accent} />;
    case 'Bonbon':
      return <BonbonLongText accent={accent} />;
    case 'Workbench':
      return <WorkbenchLongText accent={accent} />;
    case 'Nico Moji':
      return <NicoMojiLongText accent={accent} />;
    default:
      return <JaroLongText accent={accent} />; // Default to Jaro if no match found
  }
}

export function getMarqueeShortText({ fontFamily = 'Jaro', accent = '#530B67' }: CardLogoProps) {
  switch (fontFamily) {
    case 'Jaro':
      return <JaroShortText accent={accent} />;
    case 'Bungee':
      return <BungeeShortText accent={accent} />;
    case 'SF Pro':
      return <SFProShortText accent={accent} />;
    case 'Jersey 15':
      return <Jersey15ShortText accent={accent} />;
    case 'Gotham Ultra':
      return <GothamUltraShortText accent={accent} />;
    case 'Porkys':
      return <PorkysShortText accent={accent} />;
    case 'Erica':
      return <EricaShortText accent={accent} />;
    case 'Calistoga':
      return <CalistogaShortText accent={accent} />;
    case 'Keania':
      return <KeaniaShortText accent={accent} />;
    case 'Adversal':
      return <AdversalShortText accent={accent} />;
    case 'Rozha':
      return <RozhaShortText accent={accent} />;
    case 'Aventena':
      return <AventenaShortText accent={accent} />;
    case 'Ga Maamli':
      return <GaMaamliShortText accent={accent} />;
    case 'Poetsen':
      return <PoetsenShortText accent={accent} />;
    case 'Silkscreen':
      return <SilkscreenShortText accent={accent} />;
    case 'Hanalei':
      return <HanaleiShortText accent={accent} />;
    case 'Racing Sans':
      return <RacingSansShortText accent={accent} />;
    case 'Bonbon':
      return <BonbonShortText accent={accent} />;
    case 'Workbench':
      return <WorkbenchShortText accent={accent} />;
    case 'Nico Moji':
      return <NicoMojiShortText accent={accent} />;
    default:
      return <JaroShortText accent={accent} />; // Default to Jaro if no match found
  }
}
