class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_user 

  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) #memoization 
  end

  private

  def authenticate_user # we are checking if a user is logged in 
    render json: { errors: {User: "Not Authorized"} }, status: :unauthorized unless current_user
  end

end




# --------------------------------------------------

# only admins can update patients? 
# def is_authorized?
#   permitted = current_user.admin?
#   render json: { errors: {User: "does not have admin permissions" }}, status: :forbidden unless permitted 
# end 

  #rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity 
  #rescue_from ActiveRecord::RecordNotFound, with: :render_not_found 

  #def render_unprocessable_entity(invalid)
    #render json: {errors: invalid.record.errors}, status: :unprocessable_entity 
  #end 

# `authenticate_user`: unless there's a logged in user in the session hash, do not authorize the user. `unless session.include? :user_id`


# Let's walk through the code: 
  # include ActionController::Cookies: This line includes the ActionController::Cookies module in the ApplicationController. This module provides functionality related to handling cookies in Rails controllers.

  # before_action :authenticate_user: This is a callback that calls the authenticate_user method before every action in the controller. The before_action hook allows you to run certain methods before executing any action, which is useful for implementing authentication or authorization logic.

  # current_user method: This method is responsible for finding the current user based on the session[:user_id] value. It uses memoization to store the result of the user lookup in an instance variable @current_user. The memoization ensures that the database query to find the user is executed only once per request, even if current_user is called multiple times in different parts of the controller.

  # authenticate_user method: This method checks if there is a current user logged in by calling the current_user method. If there is no authenticated user (i.e., current_user returns nil), it calls the render_unauthorized method. This ensures that only authenticated users can access the protected routes.

  # render_unauthorized method: This method is called when a user is not authenticated. It returns a JSON response with an error message and sets the HTTP status to :unauthorized (HTTP 401). This indicates that the request lacks valid authentication credentials.


# In summary, the ApplicationController acts as the parent controller for all other controllers in your Rails application. It includes the ActionController::Cookies module to handle cookies, defines the current_user method to find the current user, and implements an authenticate_user method to ensure that a user is authenticated before accessing certain actions. If a user is not authenticated, the render_unauthorized method is called to return an appropriate error response. This centralizes authentication logic, allowing other controllers to inherit and use this behavior.

#-----------------------------
# MSC
  # In line 10, the current_user method retrieves the currently authenticated user based on the user_id stored in the session. It uses the find_by method to find the user by their ID.

  # The `authorize_request`` method is used as a before-action filter to ensure that the user is authenticated before accessing certain actions or pages. If the current_user method returns nil, indicating that no user is currently authenticated, error message is displayed. [maybe redirect user to the login page? redirect_to login_path]

  # def authorize_request
  #   redirect_to [LOGIN] unless current_user 
  # end 

  # the `authorize_request` method checks if the `user_id` is present in the session. If the `user_id` is not found, it renders an unauthorized response. 

  # unless current_user: This condition checks whether the current_user method returns a truthy value. If current_user is nil or false, it means that no user is currently authenticated.

  # the `current_user` method retrieves the user based on the `user_id` stored in the session. It uses memoization to avoid unnecessary database queries if the `current_user` has already been fetchd. 

  # the `logged_in?` method checks if a user is currently logged in by verifying if `current_user` is present. 

  # The ApplicationController is the base controller for your Rails application. It is inherited by all other controllers in your application.

  # The before_action callback authorize_request is invoked before every controller action, ensuring that the user is authorized.

  # The authorize_request method checks if the user_id is present in the session. If the user_id is not found, it renders a JSON response with an "Unauthorized" error and sets the HTTP status code to 401 (unauthorized).

  # The current_user method retrieves the currently logged-in user based on the user_id stored in the session. It uses memoization to avoid unnecessary database queries if the current_user has already been fetched.

  # The logged_in? method checks if a user is currently logged in by verifying if current_user is present. It returns true if a user is logged in and false otherwise.

  # By using session-based authentication, the user's session is maintained on the server-side, and the user is identified by the user_id stored in the session. This allows you to authenticate and authorize the user without relying on JWT or other tokens.

  # before_action is used to define filters that run before specific actions, while skip_before_action is used to exclude specific actions from the execution of a defined filter. These methods allow you to control the execution order and selectively apply filters to actions in your controller.

  # We want to restrict all routes except for our sessions login, and user signup. 


    # admin status 
    # def is_authorized?
    #   permitted = @current_user.admin? 
    #   render json: { errors: {User: "Does not have admin permissions"}}, status: :forbidden unless permitted 
    # end 

    #   def invalid_record(invalid)
    #   render json: { error: invalid.record.errors.full_messages.to_sentence }, status: :not_found 
    # end 

    # def no_route
    #   render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id 
    # end 

    # To achieve memoization, you need to use an instance variable (@current_user) to store the result across multiple calls to the method within the same instance. This way, the query is executed only once, and subsequent calls use the cached result.
