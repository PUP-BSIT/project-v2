import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasonalDescriptionsService {
  private descriptions: { [key: string]: string } = {
    winter: 'Winters are characterized by cool to neutral tones with medium to dark eyes (blue, icy hazel, brown, dark brown, black) and hair colors (dark brown, black-brown, black). Their skin tones range from fair to deep and have a high level of contrast. Many people of color fall into this season.',
    spring: 'Springs are warm-toned, looking better in gold jewelry than platinum or silver. Their eyes range from light to medium in darkness, with colors like clear blue, bright green, hazel, or light grey. Springs have a golden aura. Their skin tones, typically white, range from fair to tan with golden undertones.',
    summer: 'Summers are often described as having light, cool undertones with a soft, rosy or pinkish hue. Eyes often have a muted, soft appearance such as light blue, soft green or grey-green eyes. The hair typically lacks golden or red undertones. Light to medium ash blonde, light brown, or grey.',
    autumn: 'Autumns are characterized by having warm undertones with golden, peachy, or beige hues. Hair has warm highlights, often with golden, red, or auburn tones. Eyes are warm and rich, usually with golden or brown flecks.'
  };

  getDescription(season: string): string {
    return this.descriptions[season.toLowerCase()] || '';
  }
}
