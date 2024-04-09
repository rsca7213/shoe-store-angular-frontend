import { PaymentCard } from '../models/payment-card.model'
import { Person } from '../models/person.model'
import { Product } from '../models/product.model'
import { Purchase } from '../models/purchases.model'
import { User } from '../models/user.model'

export const products: Product[] = [
  {
    id: 1,
    name: 'Climacool',
    brand: 'Adidas',
    category: 'Running',
    color: 'Black',
    description:
      'The Adidas Climacool is a running shoe that is designed to keep your feet cool and dry. The shoe features a breathable mesh upper that allows air to flow through the shoe, keeping your feet cool and comfortable. The shoe also has a cushioned midsole that provides support and comfort for long runs. The Adidas Climacool is a great shoe for runners who want to stay cool and comfortable on their runs.',
    price: 100,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
  },
  {
    id: 2,
    name: 'Air Max',
    brand: 'Nike',
    category: 'Running',
    color: 'White',
    description:
      'The Nike Air Max is a running shoe that is designed to provide maximum cushioning and support. The shoe features a full-length Max Air unit that provides responsive cushioning and impact protection. The shoe also has a breathable mesh upper that helps keep your feet cool and comfortable. The Nike Air Max is a great shoe for runners who want a comfortable and supportive shoe for long runs.',
    price: 120,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
  }
]

export const users: User[] = [
  {
    id: 1,
    email: 'johndoe@gmail.com',
    role: 'Admin'
  }
]

export const people: Person[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '(+34) 0934567890',
    country: 'España',
    address: 'Avenida de la Constitución, 1, 41004 Sevilla, España'
  }
]

export const paymentCards: PaymentCard[] = [
  {
    id: 1,
    user: users[0],
    cardholder: 'John Doe',
    expiration: '12/2026',
    number: '4491956412564387'
  },
  {
    id: 2,
    user: users[0],
    cardholder: 'John Doe',
    expiration: '06/2028',
    number: '5314856419852647'
  },
  {
    id: 3,
    user: users[0],
    cardholder: 'John Doe',
    expiration: '09/2025',
    number: '3856412563145874'
  }
]

export const purchases: Purchase[] = [
  {
    id: 1,
    user: users[0],
    paymentCard: paymentCards[0],
    purchaseDate: new Date(),
    total: 100,
    items: [
      {
        product: products[0],
        quantity: 1
      }
    ]
  }
]
