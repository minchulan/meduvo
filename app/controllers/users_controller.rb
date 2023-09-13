class UsersController < ApplicationController
  before_action :find_user, only: [:show, :update, :destroy]
  skip_before_action :authorize_user, only: [:create]

  def show #get '/me'
    render json: @user, status: :ok 
  end

  def create #post '/signup'
    new_user = User.create!(user_params) 
    render json: new_user, status: :ok 
  end

  def destroy #delete '/users/:id'
    @user.destroy
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :admin)
  end

  def find_user 
    @user = current_user
    render_not_found unless @user 
  end 
end