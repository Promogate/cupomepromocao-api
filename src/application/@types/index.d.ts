export type Store = {
  id: number;
  name: string;
  store_link: string;
  created_at: string;
  updated_at: string;
}

export type homepage_best_top_three = {
  card_logo_url: string;
  card_image_url: string;
  card_content: string;
  card_cta: string;
  card_background_color: string;
  card_destination: string;
}

export type homepage_thin_banner = {
  image_url: string;
  banner_destination: string;
}

export type homepage_navigation_offer = {
  title: string;
  destination_url: string;
}

export type top_bar_cta = {
  message: string;
  cta: string;
  destination_link: string;
}

export type out_intent_offer = {
  message: string;
  title: string;
  destination_link: string;
}

export type offer_main_message = {
  first_phrase: string;
  second_phrase: string;
  third_phrase: string;
}