package com.elice.proteinplus.user.Repository;

import com.elice.proteinplus.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserJoinRepository extends JpaRepository<User, Long> {

    Optional<User> findByLoginId(String loginId);
    boolean existsByLoginId(String loginId);

    boolean existsByEmail(String email);

    boolean existsByPhone(int phone);

    void deleteByLoginId(String loginId);

}
