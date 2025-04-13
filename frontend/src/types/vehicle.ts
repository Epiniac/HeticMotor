export interface Vehicle {

  id: number;

  model: string;

  price: number;

  description: string;

  availability: boolean;

  image: string;

  option: 'rent' | 'buy';

}

export interface VehicleInput {
 model: string;
 price: string;
 description: string; 
 availability:string;
 image: string;
 option: "rent" | "buy";
}
