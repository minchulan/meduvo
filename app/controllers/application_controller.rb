class ApplicationController < ActionController::API
  include ActionController::Cookies #extended the middleware in our ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity 
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found 

  before_action :authorize_user

  def current_user 
    @current_user ||= User.find_by_id(session[:user_id])
  end

  private

  def authorize_user #checking to see if user is logged in only
    render json: { errors: "Not Authorized" }, status: :unauthorized unless current_user
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found(error)
    render json: { errors: {error.model => "Not Found"} }, status: :not_found 
  end 
end


# 1) First implement a way to keep track of currently logged in user with method `current_user` - by using our user id from session hash ahd finding our user from the database. then caching it so we dont keep making calls to our database.
# 2) Check to see if there is a current user with method `authorize_user`. If there is, we're good! If there is not, then send error message out saying user is not authorized. To actually implement and check this method, we need to also have the guard clause where we say here's where I want you to call this method .

# think about: which parts of our app we don't want user access to unless they're logged in. 


# parameter (error) lets us know which model errored out. 
#`render_not_found`` takes a param and then we'll use that param to figure out which controller is failing. 

# not preferred - do errors in serializer if going for backend 
  # def render_unprocessable_entity(invalid)
  #   errors_arr = invalid.record.errors.map{ |key, value| "#{key}: #{value}" }
  #   render json: { errors: errors_arr }, status: :unprocessable_entity
  # end