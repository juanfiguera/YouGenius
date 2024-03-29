class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception unless %w(development test).include? Rails.env

  # for testing in prod, this is dangerous
  protect_from_forgery with: :exception unless %w(production development test).include? Rails.env

  
end
