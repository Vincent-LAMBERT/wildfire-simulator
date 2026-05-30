package eu.vincent_lambert.test_java.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "app_user")
@Data
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String name;
    private final String email;

    // Default constructor (required by JPA)
    public User() {
        this.name = null;
        this.email = null;
    }
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
}