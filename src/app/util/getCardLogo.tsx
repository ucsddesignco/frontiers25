import {
  Jaro,
  Bungee,
  SFPro,
  Jersey15,
  GothamUltra,
  Porkys,
  Erica,
  Calistoga,
  Keania,
  Adversal,
  Rozha,
  Aventena,
  GaMaamli,
  Poetsen,
  Silkscreen,
  Hanalei,
  RacingSans,
  Bonbon,
  Workbench,
  NicoMoji
} from '@/app/assets/DF25Logos';

interface CardLogoProps {
  fontFamily: string | undefined;
  accent?: string | undefined;
}

export function getCardLogo({ fontFamily = 'Jaro', accent = '#530B67' }: CardLogoProps) {
  switch (fontFamily) {
    case 'Jaro':
      return <Jaro accent={accent} />;
    case 'Bungee':
      return <Bungee accent={accent} />;
    case 'SF Pro':
      return <SFPro accent={accent} />;
    case 'Jersey 15':
      return <Jersey15 accent={accent} />;
    case 'Gotham Ultra':
      return <GothamUltra accent={accent} />;
    case 'Porkys':
      return <Porkys accent={accent} />;
    case 'Erica':
      return <Erica accent={accent} />;
    case 'Calistoga':
      return <Calistoga accent={accent} />;
    case 'Keania':
      return <Keania accent={accent} />;
    case 'Adversal':
      return <Adversal accent={accent} />;
    case 'Rozha':
      return <Rozha accent={accent} />;
    case 'Aventena':
      return <Aventena accent={accent} />;
    case 'Ga Maamli':
      return <GaMaamli accent={accent} />;
    case 'Poetsen':
      return <Poetsen accent={accent} />;
    case 'Silkscreen':
      return <Silkscreen accent={accent} />;
    case 'Hanalei':
      return <Hanalei accent={accent} />;
    case 'Racing Sans':
      return <RacingSans accent={accent} />;
    case 'Bonbon':
      return <Bonbon accent={accent} />;
    case 'Workbench':
      return <Workbench accent={accent} />;
    case 'Nico Moji':
      return <NicoMoji accent={accent} />;
    default:
      return <Jaro accent={accent} />; // Default to Jaro if no match found
  }
}
