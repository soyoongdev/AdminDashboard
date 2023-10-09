// TODO: DEFINE ASSOCIATION MODELS

import BrandSchema from './brand.model'
import CartSchema from './cart.model'
import CartProductSchema from './cart_product.model'
import CategorySchema from './category.model'
import FavoriteSchema from './favorite.model'
import FollowerSchema from './follow.model'
import GenreSchema from './genre.model'
import InventorySchema from './inventory.model'
import OrderSchema from './order.model'
import ProductSchema from './product.model'
import RateSchema from './rate.model'
import ReservationSchema from './reservation.model'
import StorageSchema from './storage.model'
import TransitionSchema from './transaction.model'
import TransitionTypeSchema from './transition_type.model'
import UserSchema from './user.model'
import VoucherSchema from './voucher.model'
import VoucherTypeSchema from './voucher_type.model'

// User
UserSchema.hasMany(CartSchema, { foreignKey: 'userID' })
UserSchema.hasMany(FavoriteSchema, { foreignKey: 'userID' })
UserSchema.hasMany(RateSchema, { foreignKey: 'userID' })
UserSchema.hasMany(FollowerSchema, { foreignKey: 'userID' })
UserSchema.hasMany(TransitionSchema, { foreignKey: 'userID' })
UserSchema.hasMany(ReservationSchema, { foreignKey: 'userID' })

// Cart
CartSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
CartSchema.belongsToMany(ProductSchema, {
  through: {
    model: CartProductSchema
  },
  foreignKey: 'cartID'
})
CartSchema.hasMany(TransitionSchema, { foreignKey: 'cartID' })

// Brand
BrandSchema.hasMany(StorageSchema, { foreignKey: 'brandID' })
BrandSchema.hasMany(FollowerSchema, { foreignKey: 'brandID' })
BrandSchema.hasMany(VoucherSchema, { foreignKey: 'brandID' })

// Voucher Type
VoucherTypeSchema.hasMany(VoucherSchema, { foreignKey: 'voucherTypeID' })

// Voucher
VoucherSchema.belongsTo(VoucherTypeSchema, { foreignKey: 'voucherTypeID' })
VoucherSchema.belongsTo(BrandSchema, { foreignKey: 'brandID' })

// Product
ProductSchema.belongsToMany(CartSchema, {
  through: {
    model: CartProductSchema
  },
  foreignKey: 'productID'
})
ProductSchema.hasMany(FavoriteSchema, { foreignKey: 'productID' })
ProductSchema.hasMany(RateSchema, { foreignKey: 'productID' })
ProductSchema.belongsTo(CategorySchema, { foreignKey: 'categoryID' })
ProductSchema.belongsTo(InventorySchema, { foreignKey: 'inventoryID' })

// Category Type
CategorySchema.hasMany(ProductSchema, { foreignKey: 'categoryID' })
CategorySchema.belongsTo(GenreSchema, { foreignKey: 'genreID' })

// Transition
TransitionSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
TransitionSchema.belongsTo(CartSchema, { foreignKey: 'cartID' })
TransitionSchema.belongsTo(TransitionTypeSchema, { foreignKey: 'transitionTypeID' })
TransitionSchema.hasOne(OrderSchema, { foreignKey: 'transitionID' })

// Transition type
TransitionTypeSchema.hasMany(TransitionSchema, { foreignKey: 'transitionTypeID' })

// Order
OrderSchema.belongsTo(TransitionSchema, { foreignKey: 'transitionID' })

// Favorite
FavoriteSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
FavoriteSchema.belongsTo(ProductSchema, { foreignKey: 'productID' })

// Rate.
RateSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
RateSchema.belongsTo(ProductSchema, { foreignKey: 'productID' })

// Reservation
ReservationSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
ReservationSchema.belongsTo(InventorySchema, { foreignKey: 'inventoryID' })

// Storage
StorageSchema.hasMany(InventorySchema, { foreignKey: 'storageID' })
StorageSchema.belongsTo(BrandSchema, { foreignKey: 'brandID' })

// Inventory
InventorySchema.hasMany(ReservationSchema, { foreignKey: 'inventoryID' })
InventorySchema.hasMany(ProductSchema, { foreignKey: 'inventoryID' })
InventorySchema.belongsTo(StorageSchema, { foreignKey: 'storageID' })
