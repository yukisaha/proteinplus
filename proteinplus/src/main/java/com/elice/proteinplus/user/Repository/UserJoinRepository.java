package com.elice.proteinplus.user.Repository;

import com.elice.proteinplus.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserJoinRepository extends JpaRepository<User, Long> {

    Optional<User> findByLoginId(String loginId);

    boolean existsByLoginId(String loginId);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
    @Query("SELECT u FROM User u WHERE u.id = :userId")
    User findUserByUserId(Long userId);

    @Query("SELECT u.id FROM User u WHERE u.loginId = :loginId")
    Long findUserIdByLoginId(@Param("loginId") String loginId);


}
