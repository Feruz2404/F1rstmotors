import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './models/wishlist.model';
import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('wishlists')
@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new wishlist entry' })
  @ApiResponse({ status: 201, description: 'Wishlist item created successfully.', type: Wishlist })
  async create(@Body() createWishlistDto: CreateWishlistDto) {
      return this.wishlistService.create(createWishlistDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get()
  @ApiOperation({ summary: 'Get all wishlist items' })
  @ApiResponse({ status: 200, description: 'List of all wishlist items.', type: [Wishlist] })
  async findAll() {
      return this.wishlistService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a wishlist item by ID' })
  @ApiResponse({ status: 200, description: 'Wishlist item found.', type: Wishlist })
  @ApiResponse({ status: 404, description: 'Wishlist item not found.' })
  async findOne(@Param('id') id: number) {
      return this.wishlistService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a wishlist item by ID' })
  @ApiResponse({ status: 200, description: 'Wishlist item updated successfully.', type: Wishlist })
  @ApiResponse({ status: 404, description: 'Wishlist item not found.' })
  async update(@Param('id') id: number, @Body() updateWishlistDto: UpdateWishlistDto) {
      return this.wishlistService.update(id, updateWishlistDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(ClientGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wishlist item by ID' })
  @ApiResponse({ status: 200, description: 'Wishlist item deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Wishlist item not found.' })
  async remove(@Param('id') id: number) {
      return this.wishlistService.remove(id);
  }
}
