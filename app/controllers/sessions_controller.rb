class SessionsController < ApplicationController
  skip_before_action :authorize_user, only: [:create, :destroy]

  def create #post '/login'
    # find the user
    user = User.find_by_email(params[:email])
    # authenticate the user
    if user&.authenticate(params[:password]) 
      # save user to session
      session[:user_id] = user.id #auto logs in user 
      render json: user, status: :ok
    else
      render json: { errors: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy #delete '/logout'
    session.delete :user_id # access session and delete the user id in it
    head :no_content # send head no content or 204 back to our server
  end
end

# save user id only, we don't want to set the entire user object to cookies. sessions & cookies are lightweight pieces of data. 

# `create`: using find_by instead of find_by! or find bc we don't want to raise a 404 not found exception. 
# authenticate will use the same has and salt to the password that was entered and compare it to what the users stored password is. 

# session is accessible only to our controllers. it's an existing hash {} that's available when we configure sessions in our app.

# don't use find_by! bc it will raise a 404 user not found exception. This gives a malicious user to try a different login. 