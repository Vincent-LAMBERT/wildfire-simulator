package eu.vincent_lambert.test_java.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import eu.vincent_lambert.test_java.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{}