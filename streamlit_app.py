# streamlit_app.py
import streamlit as st
import requests
import json

# API endpoint
API_BASE_URL = "http://localhost:5000"

def initialize_session_state():
    if 'current_profile_id' not in st.session_state:
        st.session_state.current_profile_id = None
    if 'chat_messages' not in st.session_state:
        st.session_state.chat_messages = []

def create_profile(profile_data):
    response = requests.post(f"{API_BASE_URL}/create-profile", json=profile_data)
    return response.json()

def load_profile(profile_id):
    response = requests.get(f"{API_BASE_URL}/load-profile/{profile_id}")
    return response.json()

def list_profiles():
    response = requests.get(f"{API_BASE_URL}/list-profiles")
    return response.json()

def send_chat_message(message, profile_id=None):
    data = {
        "message": message,
        "profile_id": profile_id
    }
    response = requests.post(f"{API_BASE_URL}/chat", json=data)
    return response.json()

def main():
    st.set_page_config(page_title="Artemaya Nutrition Advisor", layout="wide")
    initialize_session_state()
    
    # Header
    st.title("🌿 Artemaya")
    st.subheader("Personalized Nutrition Advice Based on Your Health Profile")
    
    # Sidebar for profile management
    with st.sidebar:
        st.header("Profile Management")
        profile_action = st.radio(
            "Choose an option:",
            ["Create New Profile", "Load Existing Profile", "Chat"]
        )
    
    if profile_action == "Create New Profile":
        create_new_profile()
    elif profile_action == "Load Existing Profile":
        load_existing_profile()
    else:
        chat_interface()

def create_new_profile():
    # [Previous profile creation form code remains the same]
    # When submitting, use create_profile() function instead
    pass

def load_existing_profile():
    st.header("Load Existing Profile")
    
    profiles_response = list_profiles()
    if not profiles_response.get("success"):
        st.error("Failed to fetch profiles")
        return
        
    profiles = profiles_response.get("profiles", [])
    if not profiles:
        st.warning("No existing profiles found.")
        return
    
    selected_profile = st.selectbox("Select a profile to load:", profiles)
    
    if st.button("Load Profile"):
        with st.spinner("Loading profile..."):
            response = load_profile(selected_profile)
            if response.get("success"):
                st.session_state.current_profile_id = selected_profile
                st.success("Profile loaded successfully!")
                st.markdown("### Your Profile")
                st.markdown(response["profile"])
                st.markdown("### Recommendations")
                st.markdown(response["recommendations"])
            else:
                st.error(f"Error loading profile: {response.get('error')}")

def chat_interface():
    st.header("Chat with Artemaya")
    
    # Display chat history
    for message in st.session_state.chat_messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    
    # Chat input
    if prompt := st.chat_input("Ask about nutrition..."):
        # Add user message to chat history
        st.session_state.chat_messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)
        
        # Get bot response
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                response = send_chat_message(prompt, st.session_state.current_profile_id)
                if response.get("success"):
                    st.markdown(response["response"])
                    st.session_state.chat_messages.append({
                        "role": "assistant",
                        "content": response["response"]
                    })
                else:
                    st.error(f"Error: {response.get('error')}")

if __name__ == "__main__":
    main()