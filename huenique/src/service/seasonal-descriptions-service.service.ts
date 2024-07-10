import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasonalDescriptionsService {
  private descriptions: { [key: string]: string } = {
    winter: 'are characterized by cool to neutral tones with medium to dark eyes (blue, icy hazel, brown, dark brown, black) and hair colors (dark brown, black-brown, black). Their skin tones range from fair to deep and have a high level of contrast. Many people of color fall into this season.',
    spring: 'are warm-toned, looking better in gold jewelry than platinum or silver. Their eyes range from light to medium in darkness, with colors like clear blue, bright green, hazel, or light grey. Springs have a golden aura. Their skin tones, typically white, range from fair to tan with golden undertones.',
    summer: 'are often described as having light, cool undertones with a soft, rosy or pinkish hue. Eyes often have a muted, soft appearance such as light blue, soft green or grey-green eyes. The hair typically lacks golden or red undertones. Light to medium ash blonde, light brown, or grey.',
    autumn: 'are characterized by having warm undertones with golden, peachy, or beige hues. Hair has warm highlights, often with golden, red, or auburn tones. Eyes are warm and rich, usually with golden or brown flecks.',
    clear_winter: 'are characterized by their bright and high-contrast features. Their skin can range from fair to medium with cool undertones, often with a porcelain or cool beige appearance. Their eyes are typically clear and bright, such as icy blue, bright blue, emerald green, or cool hazel. Their hair is usually dark, ranging from dark brown to black, and can sometimes include vibrant, cool highlights. The overall look of a Clear Winter is striking and vivid, with a distinct contrast between their features.',
    cool_winter: 'possess a cool and muted palette. Their skin tones can vary from fair to dark, often with a cool undertone. They have clear and cool eyes, such as icy blue, cool green, or deep brown. Hair colors for Cool Winters are typically deep and cool, such as dark brown, black, or even cool dark blonde. The overall impression is elegant and sophisticated, with a harmonious and balanced contrast between the skin, hair, and eyes.',
    deep_winter: 'are known for their intense and rich coloring. Their skin can be fair to deep, always with cool undertones. Their eyes are typically dark and intense, including deep brown, black-brown, or dark hazel. Hair colors for Deep Winters are also deep and rich, ranging from dark brown to black. The overall look of a Deep Winter is bold and dramatic, with a high level of contrast that highlights their striking features.',
    light_summer: 'are characterized by their light and soft appearance. Their skin is usually fair to light with cool undertones, often with a rosy or pinkish hue. Their eyes are light and soft, such as light blue, soft green, or grey. Hair colors for Light Summers are typically light as well, including ash blonde or light brown. The overall look is gentle and delicate, with a harmonious blend of soft and light colors.',
    cool_summer: 'have a cool and muted palette. Their skin tones range from fair to medium, always with cool undertones. Their eyes are often cool and muted, including grey-blue, grey-green, or soft blue. Hair colors for Cool Summers are typically cool as well, such as ash blonde, light brown, or grey. The overall impression is soft and refined, with a balanced and harmonious look.',
    soft_summer: 'are known for their soft and blended appearance. Their skin tones are usually fair to medium with cool undertones. Their eyes are soft and muted, such as grey-blue, soft green, or hazel. Hair colors for Soft Summers are also soft and muted, including light brown or ash blonde. The overall look of a Soft Summer is gentle and understated, with a seamless blend of soft and cool colors.',
    soft_autumn: 'possess warm and muted tones. Their skin can be fair to medium with warm undertones, often with a beige or peachy hue. Their eyes are typically soft and warm, such as soft brown, hazel, or warm green. Hair colors for Soft Autumns are also soft and warm, including light brown, golden blonde, or soft auburn. The overall impression is warm and gentle, with a harmonious blend of muted and warm colors.',
    warm_autumn: 'are characterized by their rich and warm palette. Their skin tones range from fair to medium with warm undertones, often with a golden or peachy hue. Their eyes are warm and rich, including golden brown, warm green, or hazel. Hair colors for Warm Autumns are typically warm and rich as well, such as golden brown, red, or auburn. The overall look is vibrant and earthy, with a cohesive and warm appearance.',
    deep_autumn: 'have a deep and warm palette. Their skin tones range from fair to deep with warm undertones. Their eyes are typically deep and warm, such as dark brown, deep hazel, or warm green. Hair colors for Deep Autumns are also deep and rich, including dark brown, black, or deep auburn. The overall impression is bold and warm, with a striking contrast between their deep and warm features.',
    clear_spring: 'are characterized by their bright and warm palette. Their skin tones range from fair to medium with warm undertones, often with a clear and bright appearance. Their eyes are typically bright and clear, such as bright blue, green, or light hazel. Hair colors for Clear Springs are usually bright and warm, including golden blonde, light brown, or strawberry blonde. The overall look of a Clear Spring is fresh and vibrant, with a clear and bright appearance.',
    warm_spring: 'have a warm and vibrant palette. Their skin tones range from fair to medium with warm undertones, often with a golden or peachy hue. Their eyes are warm and bright, including golden brown, green, or hazel. Hair colors for Warm Springs are typically warm and vibrant, such as golden blonde, light brown, or red. The overall impression is lively and warm, with a cohesive and vibrant appearance.',
    light_spring: 'are known for their light and warm tones. Their skin is usually fair to light with warm undertones, often with a golden or peachy hue. Their eyes are light and warm, such as light blue, green, or light hazel. Hair colors for Light Springs are typically light and warm, including golden blonde or light brown. The overall look is delicate and fresh, with a harmonious blend of light and warm colors.'
  };

  getDescription(season: string): string {
    return this.descriptions[season.toLowerCase().replace(' ', '_')] || '';
  }
}
