class UsersController < ApplicationController
  before_action :find_user, only: [:show, :update, :destroy]
  skip_before_action :authorize_user, only: [:create] 

  def index #get '/users'
    users = User.all 
    render json: users
  end 

  def show #get '/me'
    render json: @user, status: :ok 
  end

  def create #post '/signup'
    new_user = User.create!(user_params) 
    render json: new_user, status: :ok 
  end

  def update #patch '/users/:id'
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy #delete '/users/:id'
    @user.destroy
    session.delete(:user_id) #log out our user by removing the id from our sessions hash / forgets our user.
    head :no_content
  end

  private

  def user_params
    params.permit(:email, :password)
  end

  def find_user 
    @user = current_user
    render_not_found unless @user 
  end 
end