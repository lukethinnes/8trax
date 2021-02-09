class CartridgesController < ApplicationController

    # before_action :set_cartridge, only: [:create, :update, :destroy]

    def index
        @cartridges = Cartridge.all 
        render json: @cartridges
    end

    def create
        @cartridge = Cartridge.create(cartridge_params)
        if @cartridge.save
            render json: @cartridge, status: :created, location: @cartridge
        else
            render json: @cartridge.errors, status: :unprocessable_entity
        end
    end

    def show
        set_cartridge
        render json: @cartridge
    end

    def update
        if @cartridge.update(cartridge_params)
            render json: @cartridge, status: :created, location: @cartridge
        else
            render json: @cartridge.errors, status: :unprocessable_entity
        end
    end

    def delete
        @cartridge = Cartridge.find(params[:id])
        @cartridge.destroy
        render json: {"message": "Cartridge gone."}
    end

    private

    def set_cartridge
        @cartridge = Cartridge.find(params[:id])
    end

    def cartridge_params
        params.require(:cartridge).permit(:name, :image_url, :year)
    end
    
end
