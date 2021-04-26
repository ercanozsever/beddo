import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'ercan',
            email: 'eric@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'joe',
            email: 'joe@example.com',
            password: bcrypt.hashSync('1235', 8),
            isAdmin: false
        },
        
    ],

    products: [
        
        {
            name: 'beddo™ Bambu Serisi | Standart Boy | Ortopedik Minder',
            category: 'Yastıklar',
            image: '/images/BB-001-HK.jpg',
            price: 119.99,
            vat: 0.08,
            countInStock: 10,
            brand: 'beddo™',
            rating: 4.6,
            numReviews: 15,
            description: 'Kaliteli ürünler'
        },

        {
            name: 'beddo™ Bambu Serisi | Isı Terapili | Bel Yastığı',
            category: 'Yastıklar',
            image: '/images/BB-002-HK.jpg',
            price: 119.99,
            vat: 0.08,
            countInStock: 10,
            brand: 'beddo™',
            rating: 4.8,
            numReviews: 10,
            description: 'Kaliteli ürünler'
        },

        {
            name: 'beddo™ Bambu Serisi | Masa Altı | Ayaklık Yastık',
            category: 'Yastıklar',
            image: '/images/BB-005-HK.jpg',
            price: 149.99,
            vat: 0.08,
            countInStock: 10,
            brand: 'beddo™',
            rating: 4.5,
            numReviews: 3,
            description: 'Kaliteli ürünler'
        },

        {
            name: 'beddo™ Bambu Serisi | Ortopedik Diz Yastığı',
            category: 'Yastıklar',
            image: '/images/BB-006-HK.jpg',
            price: 119.99,
            vat: 0.08,
            countInStock: 0,
            brand: 'beddo™',
            rating: 4.7,
            numReviews: 6,
            description: 'Kaliteli ürünler'
        },

        {
            name: 'beddo™ Bambu Serisi | Ortopedik Boyun | Seyahat Yastığı',
            category: 'Yastıklar',
            image: '/images/BB-003-HK.jpg',
            price: 119.99,
            vat: 0.08,
            countInStock: 10,
            brand: 'beddo™',
            rating: 4.9,
            numReviews: 4,
            description: 'Kaliteli ürünler'
        },
 
        {
            name: 'beddo™ Bambu Serisi | Ortopedik Araç Yastığı',
            category: 'Yastıklar',
            image: '/images/BB-004-ARC-HK.jpg',
            price: 119.99,
            vat: 0.08,
            countInStock: 10,
            brand: 'beddo™',
            rating: 4.9,
            numReviews: 7,
            description: 'Kaliteli ürünler'
        },
    ],
};

export default data;