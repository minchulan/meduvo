class UsersController < ApplicationController
  skip_before_action :authorize_user, only: [:create]
  before_action :find_user, only: [:show, :update, :destroy] 

  def show # '/me'
    render json: @user, status: :ok 
  end

  def create # '/signup'
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else  
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end  
  end

  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    session.delete :user_id
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def find_user # 
    @user = current_user
    render_not_found unless @user 
  end 
end

## `create` action:
# used create instead of create! to avoid raising an exception if the record cannot be saved. this way i have more control over the flow and better error handling. 

## `before_action` for the `find_user` method:
# `find_user` method is shared among the actions that need the current user.
# instead of manually calling `authorize_user` in each action, used `before_action to auto run the authorization check before these actions.` 
